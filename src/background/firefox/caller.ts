import type {OUTPUT_TYPE} from '../../type/index.type';
import converter from '../converter';

export default function (type: OUTPUT_TYPE) {
    browser.tabs.query({active: true, currentWindow: true}).then((tabs) => {
        browser.tabs.sendMessage(tabs[0].id, {
            command: 'TRPG-CLERKS',
        }).then(converter.bind(null, type));
    });
}
