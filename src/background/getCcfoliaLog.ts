import type {ResponseMessage, JsonMessage } from '../type/index.type';

function extractLog(multiListRoot: HTMLElement): Promise<ResponseMessage> {
  return new Promise((resolve) => {
    setTimeout(function () {
      requestIdleCallback(
        function () {
          const messages = Array.from(multiListRoot.getElementsByClassName('MuiListItem-root')).map((node) => {
            const nameLine = node.getElementsByClassName('MuiListItemText-primary')[0] as HTMLElement;
            const messageBodyTag = node.getElementsByClassName('MuiTypography-secondary')[0] as HTMLElement;
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
          resolve({
            type: 'ccfolia',
            messages
          });
        },
        { timeout: 3000 }
      );
    }, 800);
  });
}

export default function getCcfoliaLog(): Promise<ResponseMessage> {
  const multiListRoot = <HTMLElement>document.getElementsByClassName('MuiList-root')[0];
  const fullHeight = (multiListRoot.firstChild as HTMLElement).style.height;
  multiListRoot.style.height = fullHeight;
  multiListRoot.parentElement.style.height = fullHeight;
  return extractLog(multiListRoot).finally(() => {
    multiListRoot.style.height = '';
    multiListRoot.parentElement.style.height = '';
  });
}
