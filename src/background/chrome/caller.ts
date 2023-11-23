import logger from '../../lib/logger';
import converter from '../converter';

function logListener(message: { type: string; message: string }) {
  if (message.type === 'TRPG-CLERKS-LOG') {
    logger.log(message.message);
  }
}

export default function () {
  chrome.runtime.onMessage.removeListener(logListener);
  chrome.runtime.onMessage.addListener(logListener);

  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    logger.initial();
    chrome.tabs.sendMessage(tabs[0].id, {type: 'TRPG-CLERKS'}, converter.bind(null));
  });
}
