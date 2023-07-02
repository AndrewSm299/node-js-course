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

function outputHttpResponse(statusCode, statusMessage, headers, body) {
    console.log(`HTTP/1.1 ${statusCode} ${statusMessage}
${headers}

${body}`)
}
   
function processHttpRequest($method, $uri, $headers, $body) {
    const date = new Date(),
    options = { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'short' },
    formattedDate = date.toLocaleString('en-US', options)
    if($method == 'GET' && $uri.match(/\/sum\?nums\=[[0-9]*,]*/)){
        let sum = 0
        let arrayOfNumbers = $uri.slice($uri.indexOf('=') + 1, $uri.length).split(',').map(Number).forEach(num => sum += num)
        $body = sum.toString()
        $headers = `Date: ${formattedDate}
Server: Apache/2.2.14 (Win32)
Connection: Closed
Content-Type: text/html; charset=utf-8
Content-Length: ${$body.length}`
        outputHttpResponse('200','OK' , $headers, $body)
    }
    else if($method != 'GET'|| $uri.match(/\/sum(?!.*\?nums=).*/) ){
        $body = 'bad request'
        $headers = `Date: ${formattedDate}
Server: Apache/2.2.14 (Win32)
Connection: Closed
Content-Type: text/html; charset=utf-8
Content-Length: ${$body.length}`
        outputHttpResponse('400', 'Bad Request' , $headers, $body)
    }
    else{
        $body = 'not found'
        $headers = `Date: ${formattedDate}
Server: Apache/2.2.14 (Win32)
Connection: Closed
Content-Type: text/html; charset=utf-8
Content-Length: ${$body.length}`
        outputHttpResponse('404', 'Not Found', $headers, $body)
}
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


// for tests of bad request(6 - if method not get, 7 - if no ?nums=) or not found(8 - if no /sum) write node tester.js (number of the test) HTTPanswer.js; for the last test write node tester.js 9 HTTPResponse.js
