# ここぽい(仮)
## これはなに？
ココフォリアの発言タブから、アイコン付きで発言を抽出するブラウザ拡張機能です。
抽出されたログはzip形式でダウンロードでき、外部サーバーには送信しません。

## 使い方
1. [Release](./releases)から、お使いのブラウザに合ったzipファイルをダウンロードします。
2. zipファイルを解凍します。
3. この後に記載している「ブラウザにパッケージを読み込む方法」でブラウザに読み込ませます。
4. ココフォリアのルームに入ります。
5. 拡張機能として「ここぽい(仮)」が選択できるので、クリックします。
6. 出てきた小ウィンドウの内容に従ってください。

### ブラウザにパッケージを読み込む方法

**Chrome（クローム）**

1. ブラウザのURLアドレスバーにアクセスします。
2. `chrome://extensions/` と入力します。
3. "**開発者モード**"に切り替えます。
4. "**Load unpacked（パッケージの読み込み）**"をクリックして拡張機能を読み込みます。
5. 拡張機能のディレクトリに移動します。
    - 開発者はソースコード内の `dist/` を指定します。
6. 完了！

詳細はこちらを確認してください：[https://developer.chrome.com/extensions/getstarted](https://developer.chrome.com/extensions/getstarted)

**Edge（エッジ）**

1. ブラウザのURLアドレスバーにアクセスします。
2. `edge://extensions/` と入力します。
3. `開発者モード`をオンにします。
4. "**Load unpacked（パッケージの読み込み）**"をクリックして拡張機能を読み込みます。
5. 拡張機能のディレクトリに移動します。
    - 開発者はソースコード内の `dist/` を指定します。
6. 完了！

**Firefox（ファイヤーフォックス）**

1. ブラウザのURLアドレスバーにアクセスします。
2. `about:debugging#/runtime/this-firefox` と入力します。
3. **Load Temporary Add-on...（一時的なアドオンを読み込む...）** をクリックします。
4. 拡張機能のディレクトリ内にある、`manifest.json` に移動して **Open（開く）** をクリックします。
5. 完了！

詳細はこちらを確認してください：[https://extensionworkshop.com/documentation/develop/temporary-installation-in-firefox/](https://extensionworkshop.com/documentation/develop/temporary-installation-in-firefox/)

## Development(開発者向け)

### Build

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

## License
### Source Code
MIT

### Icon
- https://www.pngrepo.com/svg/186569/dice
- https://gahag.net/009422-game-festival/