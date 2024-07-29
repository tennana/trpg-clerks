import type { JsonMessage, ResponseMessage } from '../type/index.type';

function extractLog(multiListRoot: HTMLElement, logger: (message: string) => void): Promise<ResponseMessage> {
  return new Promise((resolve, reject) => {
    requestIdleCallback(
      function () {
        try {
          const messages = Array.from(multiListRoot.getElementsByClassName('MuiListItem-root')).map((node) => {
            const nameLine = node.getElementsByClassName('MuiListItemText-primary')[0] as HTMLElement;
            let messageBodyTag =
              node.getElementsByClassName('MuiListItemText-secondary')[0] as HTMLElement
            ;
            if(messageBodyTag.childElementCount) {
              const origBodyTag = messageBodyTag;
              messageBodyTag = messageBodyTag.cloneNode(true) as HTMLElement;
              for (let i = 0; i < messageBodyTag.children.length; i++) {
                const child = messageBodyTag.children[i];
                // 色付けを差し替え
                (child as HTMLElement).style.color = window.getComputedStyle(origBodyTag.children[i]).color;
                child.className = '';
                child.removeAttribute('class');
              }
            }
            const body = messageBodyTag.innerText;
            const htmlBody = messageBodyTag.innerHTML
              .replace(/class=""/g, '')
              .replace(/\r?\n/g, '<br>');
            if (!nameLine.firstChild) {
              // System Message
              return {
                name: 'System',
                body,
                htmlBody,
                iconUrl: '',
              };
            }
            const name = nameLine.firstChild.textContent || '';
            const color = nameLine.style.color;
            const iconTag = node.getElementsByClassName('MuiListItemAvatar-root')[0].getElementsByTagName('img')[0];
            const iconUrl = iconTag && iconTag.src.replace('https://ccfolia.com/blank.gif', '');

            return {
              name,
              body,
              htmlBody,
              iconUrl,
              color,
            } as JsonMessage;
          });
          logger(`発言数合計: ${messages.length}件`);
          resolve({
            type: 'ccfolia',
            messages,
          });
        } catch (e) {
          reject(e);
        }
      },
      { timeout: 3000 }
    );
  });
}

function needExtendHeight(fullHeight: number, multiListRoot: HTMLElement) {
  return fullHeight - 200 > (multiListRoot.firstChild.firstChild as HTMLElement).clientHeight;
}

function startObserve(
  logger: (message: string) => void,
  multiListRoot: HTMLElement,
  fullHeight: number,
  resolve: (observer: MutationObserver) => void
) {
  logger(`発言検出中: 合計${multiListRoot.getElementsByClassName('MuiListItem-root').length}件`);
  const observer = new MutationObserver((mutations) => {
    let exists = false;
    for (const mutation of mutations) {
      if (mutation.type !== 'childList' || !mutation.addedNodes || mutation.addedNodes.length === 0) {
        continue;
      }
      if (
        Array.from(mutation.addedNodes).find(
          (chat: HTMLElement) => chat.getElementsByClassName('MuiListItem-root').length
        )
      ) {
        exists = true;
        break;
      }
    }
    if (!exists) {
      return;
    }
    logger(`発言検出中: 合計${multiListRoot.getElementsByClassName('MuiListItem-root').length}件`);
    clearTimeout(clearTimeoutId);
    requestIdleCallback(() => {
      if (needExtendHeight(fullHeight, multiListRoot)) {
        clearTimeout(clearTimeoutId);
        clearTimeoutId = setTimeout(() => {
          if (needExtendHeight(fullHeight, multiListRoot)) {
            logger('表示領域の描画待ちがタイムアウトしました。現在の表示完了分から取得します。');
          }
          resolve(observer);
        }, 5000);
      } else {
        resolve(observer);
      }
    });
  });
  observer.observe(multiListRoot, { childList: true, subtree: true });

  let clearTimeoutId = setTimeout(() => {
    logger('表示領域の描画待ちがタイムアウトしました。現在の表示完了分から取得します。');
    resolve(observer);
  }, 10000);

  requestIdleCallback(
    () => {
      logger('表示領域拡張: 開始');
      multiListRoot.style.height = fullHeight + 'px';
      multiListRoot.parentElement.style.height = fullHeight + 'px';
    },
    { timeout: 1000 }
  );
}

export default async function getCcfoliaLog(logger: (message: string) => void): Promise<ResponseMessage> {
  try {
    const multiListRoot = <HTMLElement>document.getElementsByClassName('MuiList-root')[0];
    const fullHeight = (multiListRoot.firstChild as HTMLElement).scrollHeight;
    if (needExtendHeight(fullHeight, multiListRoot)) {
      try {
        await new Promise<MutationObserver>(startObserve.bind(this, logger, multiListRoot, fullHeight)).then(
          (observer) => {
            observer.disconnect();
          }
        );
      } catch (e) {
        logger('描画待ち処理に失敗しました:' + e);
      }
      return extractLog(multiListRoot, logger).finally(() => {
        multiListRoot.style.height = '';
        multiListRoot.parentElement.style.height = '';
        logger('表示領域拡張: 終了');
      });
    }
    logger('表示領域拡張: 不要');
    return extractLog(multiListRoot, logger);
  } catch (e) {
    return Promise.reject(e);
  }
}
