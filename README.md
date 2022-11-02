# Web Extension Svelte Boilerplate

## Development

```bash
npm i
```

**Chrome**

```bash
npm run app:chrome-dev
```

**Edge**

```bash
npm run app:edge-dev
```

**Firefox**

```bash
npm run app:firefox-dev
```

## Production

```bash
npm i
```

```bash
npm run app:chrome
```

**Edge**

```bash
npm run app:edge
```

**Firefox**

```bash
npm run app:firefox
```

## Load package to browsers

**Chrome**

1. Go to the browser's URL address bar
2. Enter `chrome://extensions/`
3. Switch to "**Developer mode**"
4. Load extension by clicking "**Load unpacked**"
5. Browse to `dist/` in source code
6. Done!

Check here for more detail: [https://developer.chrome.com/extensions/getstarted](https://developer.chrome.com/extensions/getstarted)

**Edge**

1. Go to the browser's URL address bar
2. Enter `edge://extensions/`
3. Turn on `Developer mode`
4. Load extension by clicking "**Load unpacked**"
5. Browse to `dist/` in source code
6. Done!

**Firefox**

1. Go to the browser's URL address bar
2. Enter `about:debugging#/runtime/this-firefox`
3. Click **Load Temporary Add-on...**
4. Browse to your `manifest.json` & click **Open**
5. Done!

Check here for more details: [https://extensionworkshop.com/documentation/develop/temporary-installation-in-firefox/](https://extensionworkshop.com/documentation/develop/temporary-installation-in-firefox/)

## How to keep devtool appears when developing

Simple, just open chrome extension as a page. To do that, follow below steps:

1. Open extension management page
<img width="333" alt="Screen Shot 2021-05-27 at 14 44 56" src="https://user-images.githubusercontent.com/6290720/119772790-b011f380-befa-11eb-9ab2-f49c1858206b.png">

2. Copy extension id

<img width="712" alt="Screen Shot 2021-05-27 at 14 45 20" src="https://user-images.githubusercontent.com/6290720/119773037-0b43e600-befb-11eb-8887-1696816026d0.png">

3. Open extension as a page `chrome-extension://<extension-id>/popup.html`

- For example: [chrome-extension://npjcjlkchmiidojhockoecphakigbaej/popup.html](chrome-extension://npjcjlkchmiidojhockoecphakigbaej/popup.html)

<img width="792" alt="chrome-extension://npjcjlkchmiidojhockoecphakigbaej/popup.html" src="https://user-images.githubusercontent.com/6290720/120733663-90925080-c522-11eb-8b92-8bc34def4333.png">

## License
### Source Code
MIT

### Icon
https://www.pngrepo.com/svg/186569/dice
https://gahag.net/009422-game-festival/