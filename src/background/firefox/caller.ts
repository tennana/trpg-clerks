import logger from '../../lib/logger';
import converter from '../converter';

function logListener(message: { type: string; message: string }) {
  if (message.type === 'TRPG-CLERKS-LOG') {
    logger.log(message.message);
  }
}

export default function () {
  logger.initial();
  browser.runtime.onMessage.removeListener(logListener);
  browser.runtime.onMessage.addListener(logListener);

  browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
    browser.tabs
      .sendMessage(tabs[0].id, {
        command: 'TRPG-CLERKS',
        tabId: tabs[0].id,
      })
      .then(converter.bind(null));
  });
}
