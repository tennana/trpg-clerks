import type {ResponseMessage} from '../type/index.type';


export default function (res: ResponseMessage) {
    console.log(res);
    const blob = new Blob([JSON.stringify(res.messages)], { type: 'application/json' });
    const aTag = document.createElement('a');
    aTag.href = URL.createObjectURL(blob);
    aTag.target = '_blank';
    aTag.download = 'output.json';
    aTag.click();
    URL.revokeObjectURL(aTag.href);
}
