import type {OUTPUT_TYPE} from '../../type/index.type';
import converter from '../converter';

export default function (type: OUTPUT_TYPE) {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {type: 'TRPG-CLERKS'}, converter.bind(null, type));
    });
}
