import { writable } from 'svelte/store';

const store = writable('');

function getDateString() {
  const date = new Date();
  return (
    date.getHours() +
    ':' +
    date.getMinutes() +
    ':' +
    date.getSeconds() +
    ':' +
    ('000' + date.getMilliseconds()).substring(-3)
  );
}

export default {
  subscribe: store.subscribe,
  log: (message) => store.update((prev) => prev + `\n${getDateString()}: ${message}`),
  initial: () => store.set(`${getDateString()}: 取得: スタート`),
};
