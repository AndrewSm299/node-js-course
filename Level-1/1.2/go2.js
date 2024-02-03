// этот файл надо будет дописать...

// не обращайте на эту функцию внимания 
// она нужна для того чтобы правильно читать входные данные
function readHttpLikeInput(){
    var fs = require("fs");
    var res = "";
    var buffer = Buffer.alloc ? Buffer.alloc(1) : new Buffer(1);
    let was10 = 0;
    for(;;){ 
        try { fs.readSync(0 /*stdin fd*/, buffer, 0, 1); } catch (e) {break; /* windows */}
        if(buffer[0] === 10 || buffer[0] === 13) {
            if (was10 > 10) 
                break;
            was10++;
        } else 
           was10 = 0;
        res += new String(buffer);
    }

    return res;
}

let contents = readHttpLikeInput();

// вот эту функцию собственно надо написать
function parseTcpStringAsHttpRequest(string) {
    let array = string.split(/\r?\n/).filter((str) => str.replaceAll(' ', '').length != 0),
        methodData = array[0].match(/[A-Z]*\s/)[0].trim(),
        uriData = array[0].match(/\s[^\s]*\s/)[0].trim(),
        headersData = {},
        bodyData = array[array.length - 1].trim(),
        headerName,
        headerValue,
        headerParts
    
    for (let i = 1; i < array.length - 1; i++) {
        headerParts = array[i].split(':')
        headerName = headerParts[0].trim()
        headerValue = headerParts[1].trim()
        headersData[headerName] = headerValue
    }

    return {
      method: methodData,
      uri: uriData,
      headers: headersData,
      body: bodyData,
    }
}

http = parseTcpStringAsHttpRequest(contents); 
console.log(JSON.stringify(http, undefined, 2));
