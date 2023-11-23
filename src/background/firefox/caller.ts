import converter from '../converter';

export default function () {
  browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
    browser.tabs
      .sendMessage(tabs[0].id, {
        command: 'TRPG-CLERKS',
      })
      .then(converter.bind(null));
  });
}
