const path = require('path')

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

function outputHttpResponse(statusCode, statusMessage, headers, body) {
    console.log(`HTTP/1.1 ${statusCode} ${statusMessage}
${headers}

${body}`)
}
   
function processHttpRequest($method, $uri, $headers, $body) {
    let basefolder = ``
    if($headers["Host"].match(/another.shpp.me/)){
        basefolder = 'another/'
    }
    else if($headers["Host"].match(/student.shpp.me/)){
        basefolder = 'student/'
    }
    else{
        return outputHttpResponse('404', 'Not found', `Server: Apache/2.2.14 (Win32)\nContent-Length: 9\nConnection: Closed\nContent-Type: text/html; charset=utf-8`, `NOT FOUND`)
    }
    const filePath = $uri == `/` ? `./${basefolder}index.html` : `./` + basefolder.slice(-1) + $uri
    const rootPath = ``
    if(isWithinRootDirectory(rootPath, filePath)){ 
        if (require('fs').existsSync(filePath)) {
            $body = `FOUND`
            $headers = `Server: Apache/2.2.14 (Win32)\nContent-Length: ${$body.length}\nConnection: Closed\nContent-Type: text/html; charset=utf-8`
            StatusCode = '200'
            StatusMessage = 'OK'
        }
        else{
            $body = `NOT FOUND`
            $headers = `Server: Apache/2.2.14 (Win32)\nContent-Length: ${$body.length}\nConnection: Closed\nContent-Type: text/html; charset=utf-8`
            StatusCode = '404'
            StatusMessage = 'Not found'
        }
    }
    else{
        
    }
    return outputHttpResponse(statusCode, statusMessage, $headers, $body)
}

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
processHttpRequest(http.method, http.uri, http.headers, http.body);
