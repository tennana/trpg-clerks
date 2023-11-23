import type { JsonMessage, ResponseMessage } from '../type/index.type';

function extractLog(multiListRoot: HTMLElement, logger: (message: string) => void): Promise<ResponseMessage> {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      requestIdleCallback(
        function () {
          try {
            const messages = Array.from(multiListRoot.getElementsByClassName('MuiListItem-root')).map((node) => {
              const nameLine = node.getElementsByClassName('MuiListItemText-primary')[0] as HTMLElement;
              const messageBodyTag = node.getElementsByClassName('MuiListItemText-secondary')[0] as HTMLElement;
              if (!nameLine.firstChild) {
                // System Message
                const body = messageBodyTag.innerText;
                return {
                  name: 'System',
                  body,
                  iconUrl: '',
                };
              }
              const name = nameLine.firstChild.textContent || '';
              const body = messageBodyTag.innerText;
              const iconTag = node.getElementsByClassName('MuiListItemAvatar-root')[0].getElementsByTagName('img')[0];
              const iconUrl = iconTag && iconTag.src.replace('https://ccfolia.com/blank.gif', '');

              return {
                name,
                body,
                iconUrl,
              } as JsonMessage;
            });
            logger(`${messages.length}件の発言を取得`);
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
    }, 800);
  });
}

export default function getCcfoliaLog(logger: (message: string) => void): Promise<ResponseMessage> {
  logger('表示領域拡張: 開始');
  try {
    const multiListRoot = <HTMLElement>document.getElementsByClassName('MuiList-root')[0];
    const fullHeight = (multiListRoot.firstChild as HTMLElement).style.height;
    multiListRoot.style.height = fullHeight;
    multiListRoot.parentElement.style.height = fullHeight;
    const responseMessagePromise = extractLog(multiListRoot, logger);
    responseMessagePromise.finally(() => {
      multiListRoot.style.height = '';
      multiListRoot.parentElement.style.height = '';
      logger('表示領域拡張: 終了');
    });
    return responseMessagePromise;
  } catch (e) {
    return Promise.reject(e);
  }
}
