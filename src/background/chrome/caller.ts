import converter from '../converter';

export default function () {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { type: 'TRPG-CLERKS' }, converter);
    });
}
