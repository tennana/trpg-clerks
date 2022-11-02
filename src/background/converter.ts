import exportFromJSON from 'export-from-json';
import SimpleZip from 'simplezip.js';
import ObjectsToCsv from 'objects-to-csv';
import type {ResponseMessage} from '../type/index.type';

interface OUTPUT_FILE {
    filename: string;
    blob: Blob;
    originalUrl?: string;
}

/*
async function convertPng(iconfileInfo: OUTPUT_FILE): Promise<OUTPUT_FILE> {
    const imgUrl = URL.createObjectURL(iconfileInfo.blob);
    const img = new Image();
    img.src = imgUrl;

    await new Promise<void>(resolve => {
       img.addEventListener('load', () => {
           resolve();
       }, {once: true});
    });

    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 400;
    const context = canvas.getContext('2d');
    context.drawImage(img, 0, 0, 400, 400);

    const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob(resolve);
    });

    return {
        ...iconfileInfo,
        blob
    };
}
*/

async function getIconImgs(res: ResponseMessage): Promise<OUTPUT_FILE[]> {
    const fileMap: Map<string, Promise<Blob>> = new Map();
    const fetchList: Promise<Blob>[] = [];
    res.messages.forEach(message => {
        if (fileMap.has(message.iconUrl) || !message.iconUrl) {
            return;
        }
        const fetchPromise = fetch(message.iconUrl, {cache: 'force-cache'}).then(res => res.blob());
        fetchList.push(fetchPromise);
        fileMap.set(message.iconUrl, fetchPromise);
    });
    return Promise.all(fetchList).then(() => {
        let index = 0;
        const fileList: OUTPUT_FILE[] = [];
        fileMap.forEach(async (file, originalUrl) => {
            index++;
            fileList.push({
                filename: `${index}`.padStart(5, '0') + '.webp',
                blob: await file,
                originalUrl
            });
        });
        return fileList;
    });
}

type ZipFile = { name: string, data: ArrayBuffer | Uint8Array | string };

function exportJson(res: ResponseMessage): ZipFile {
    return {
        name: 'messages.json',
        data: new TextEncoder().encode(JSON.stringify(res.messages))
    };
}

async function exportCsv(res: ResponseMessage): Promise<ZipFile> {
    return new Promise(resolve => {
        exportFromJSON({
            data: res.messages, exportType: exportFromJSON.types.csv, processor: function (content) {
                resolve({
                    name: 'messages.csv',
                    data: new TextEncoder().encode(content)
                });
            }
        });
    });
}

async function exportMain(res: ResponseMessage): Promise<OUTPUT_FILE> {
    const iconFileList = await getIconImgs(res);
    res.messages.forEach(message => {
        message.iconUrl = iconFileList.find(iconFileInfo => iconFileInfo.originalUrl === message.iconUrl)?.filename || message.iconUrl;
    });
    const zipFiles: ZipFile[] = [
        exportJson(res),
        await exportCsv(res)
    ];
    for (const iconFileInfo of iconFileList) {
        zipFiles.push({
            name: iconFileInfo.filename,
            data: await iconFileInfo.blob.arrayBuffer()
        });
    }
    const data = SimpleZip.GenerateZipFrom(zipFiles);
    return {
        filename: 'output.zip',
        blob: new Blob([data], {type: 'octet/stream'})
    };
}


export default async function (res: ResponseMessage) {
    const file = await exportMain(res);
    const aTag = document.createElement('a');
    aTag.href = URL.createObjectURL(file.blob);
    aTag.target = '_blank';
    aTag.download = file.filename;
    aTag.click();
    URL.revokeObjectURL(aTag.href);
}
