/// <reference types="web-ext-types"/>
import getCcfoliaLog from '../getCcfoliaLog';

browser.runtime.onMessage.addListener((message) => {
    if (message.command !== 'TRPG-CLERKS') {
        return;
    }
    return getCcfoliaLog();
});
