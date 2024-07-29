import exportFromJSON from 'export-from-json';
import SimpleZip from 'simplezip.js';
import Standard from '../components/template/Standard.svelte';
import logger from '../lib/logger';
import type { ResponseMessage } from '../type/index.type';

interface OUTPUT_FILE {
  filename: string;
  blob: Blob;
  originalUrl?: string;
}

async function getIconImgs(res: ResponseMessage): Promise<OUTPUT_FILE[]> {
  const fileMap: Map<string, Promise<Blob>> = new Map();
  const fetchList: Promise<Blob>[] = [];
  res.messages.forEach((message) => {
    if (fileMap.has(message.iconUrl) || !message.iconUrl || message.iconUrl.startsWith('data:')) {
      return;
    }
    const fetchPromise = fetch(message.iconUrl, { cache: 'force-cache' }).then((res) => {
      if (res.ok) {
        return res.blob();
      }
      return null;
    });
    fetchList.push(fetchPromise);
    fileMap.set(message.iconUrl, fetchPromise);
  });
  logger.log('画像取得処理開始:' + fetchList.length + '件');
  const fileList: OUTPUT_FILE[] = [];
  return Promise.all(fetchList)
    .then(() => {
      let index = 0;
      fileMap.forEach(async (file, originalUrl) => {
        index++;
        return file.then(
          function (index: number, blob: Blob | null) {
            if (blob)
              fileList.push({
                filename: 'images/' + `${index}`.padStart(5, '0') + '.webp',
                blob: blob,
                originalUrl,
              });
          }.bind(this, index)
        );
      });
      return fileList;
    })
    .finally(() => {
      logger.log('画像取得処理完了:' + fileList.length + '件 / 削除済み画像:' + (fetchList.length - fileList.length));
    });
}

type ZipFile = { name: string; data: ArrayBuffer | Uint8Array | string };

function exportJson(res: ResponseMessage): ZipFile {
  logger.log('JSON生成: 開始');
  const json = new TextEncoder().encode(JSON.stringify(res.messages));
  logger.log('JSON生成: 開始');
  return {
    name: 'messages.json',
    data: json,
  };
}

async function exportCsv(res: ResponseMessage): Promise<ZipFile> {
  return new Promise((resolve) => {
    logger.log('CSV生成: 開始');
    exportFromJSON({
      data: res.messages,
      exportType: exportFromJSON.types.csv,
      processor: function (content) {
        logger.log('CSV生成: 完了');
        resolve({
          name: 'messages.csv',
          data: new TextEncoder().encode(content),
        });
      },
    });
  });
}

async function exportHtml(res: ResponseMessage): Promise<ZipFile> {
  logger.log('HTML生成: 開始');
  const divRoot = document.createElement('div');
  const component = new Standard({
    target: divRoot,
    props: {
      messages: res.messages,
    },
  });
  return new Promise((resolve) => {
    const convert = function () {
      resolve({
        name: 'messages.html',
        data: new TextEncoder().encode(
          `<style>
    .message { display: flex; border-bottom: 1px solid gray; }
    .message .body { color: initial; }
    .icon, .icon > img {
        width: 40px;
        height: 40px;
    }
    h4 { margin: 0 }
</style>` + component.$$.root.innerHTML
        ),
      });
      logger.log('HTML生成: 完了');

      component.$destroy();
    };
    component.$on('onMount', convert);
    requestIdleCallback(convert, { timeout: 1000 });
  });
}

async function exportMain(res: ResponseMessage): Promise<OUTPUT_FILE> {
  try {
    const iconFileList = await getIconImgs(res);

    let existsNotFound = false;
    res.messages.forEach((message) => {
      if (!message.iconUrl) {
        return;
      }
      const filename = iconFileList.find((iconFileInfo) => iconFileInfo.originalUrl === message.iconUrl)?.filename;
      if (!filename) {
        existsNotFound = true;
      }
      message.iconUrl = filename || 'images/404.svg';
    });
    const zipFiles: ZipFile[] = [exportJson(res), await exportCsv(res), await exportHtml(res)];
    logger.log('ZIPファイル生成: 開始');
    for (const iconFileInfo of iconFileList) {
      zipFiles.push({
        name: iconFileInfo.filename,
        data: await iconFileInfo.blob.arrayBuffer(),
      });
    }
    if (existsNotFound) {
      zipFiles.push({
        name: 'images/404.svg',
        data: await fetch('images/404.svg').then((res) => res.arrayBuffer()),
      });
    }
    const data = SimpleZip.GenerateZipFrom(zipFiles);
    logger.log('ZIPファイル生成: 完了');
    return {
      filename: 'output.zip',
      blob: new Blob([data], { type: 'octet/stream' }),
    };
  } catch (e) {
    logger.log('発言の加工処理でエラーが発生しました:' + e);
  }
}

export default async function (res: ResponseMessage) {
  if (!res) {
    logger.log('取得に失敗しました。タブをリロードしてやり直すか、諦めて下さい。');
    return;
  }
  const file = await exportMain(res);
  const aTag = document.createElement('a');
  aTag.href = URL.createObjectURL(file.blob);
  aTag.target = '_blank';
  aTag.download = file.filename;
  aTag.click();
  URL.revokeObjectURL(aTag.href);
  logger.log('取得: 終了');
}
