/// <reference types="chrome"/>
import getCcfoliaLog from '../getCcfoliaLog';

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  if (msg.type !== 'TRPG-CLERKS') {
    return false;
  }
  getCcfoliaLog().then(sendResponse);
  return true;
});
