/// <reference types="chrome"/>
import getCcfoliaLog from '../getCcfoliaLog';

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  if (msg.type !== 'TRPG-CLERKS') {
    return false;
  }
  const logger = (message: string) => chrome.runtime.sendMessage({ type: 'TRPG-CLERKS-LOG', message });
  getCcfoliaLog(logger).then(sendResponse, (e) => sendResponse({ type: 'error', e }));
  return true;
});
