function stringToBase64(str) {
    const base64Str = Buffer.from(str).toString('base64');

    return base64Str;
}

function base64ToString(base64Str) {
    const str = Buffer.from(base64Str, 'base64').toString();

    return str;
}


const str = '你好';
const base64Str = stringToBase64(str);
console.log(base64Str);
console.log(base64ToString(base64Str));
