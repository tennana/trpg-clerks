/// <reference types="web-ext-types"/>
import getCcfoliaLog from '../getCcfoliaLog';

browser.runtime.onMessage.addListener((commandMessage: { command: string; tabId: string }) => {
  if (commandMessage.command !== 'TRPG-CLERKS') {
    return;
  }
  const logger = (message: string) =>
    browser.runtime.sendMessage(commandMessage.tabId, { type: 'TRPG-CLERKS-LOG', message });
  return getCcfoliaLog(logger);
});
