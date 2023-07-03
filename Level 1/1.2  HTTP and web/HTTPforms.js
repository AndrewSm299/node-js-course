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
    const filePath = "./passwords.txt"
    let StatusCode = ``
    let StatusMessage = ``
    let login = ''
    let password = '' 
    if($body.match(/login=[a-z1-9]*&password=[a-z1-9]*/)){
        let loginandpassword = $body.split('&')
        login = loginandpassword[0].slice(loginandpassword[0].indexOf('=') + 1).toString()
        password = loginandpassword[1].slice(loginandpassword[1].indexOf('=') + 1).toString()
    }
    else{
        outputHttpResponse('400', 'Bad Request' , `Server: Apache/2.2.14 (Win32)\nContent-Length: 11\nConnection: Closed\nContent-Type: text/html; charset=utf-8`, `bad request`)
    }
    if (require('fs').existsSync(filePath)) {
        if($method == 'POST' && $uri == '/api/checkLoginAndPassword' && $headers["Content-Type"] == 'application/x-www-form-urlencoded'){
            if(require("fs").readFileSync(filePath, "utf8", (data) => data.toString().indexOf(`${login}:${password}`) !== -1)){
                $body = `<h1 style="color:green">FOUND</h1>`
                $headers = `Server: Apache/2.2.14 (Win32)\nContent-Length: ${$body.length}\nConnection: Closed\nContent-Type: text/html; charset=utf-8`
                StatusCode = '200'
                StatusMessage = 'OK'
            }
            else{
                $body = `<h1 style="color:red">NOT FOUND</h1>`
                $headers = `Server: Apache/2.2.14 (Win32)\nContent-Length: ${$body.length}\nConnection: Closed\nContent-Type: text/html; charset=utf-8`
                StatusCode = '200'
                StatusMessage = 'OK'
            }
        }
        else if($method != 'POST'|| $uri != `/api/checkLoginAndPassword` || $headers["Content-Type"] != 'application/x-www-form-urlencoded'){
            $body = `bad request`
            $headers = `Server: Apache/2.2.14 (Win32)\nContent-Length: ${$body.length}\nConnection: Closed\nContent-Type: text/html; charset=utf-8`
            StatusCode = '400'
            StatusMessage = 'Bad Request'
        }
        else{
            $body = `not found`
            $headers = `Server: Apache/2.2.14 (Win32)\nContent-Length: ${$body.length}\nConnection: Closed\nContent-Type: text/html; charset=utf-8`
            StatusCode = '404'
            StatusMessage = 'Not Found'
        }
    } 
    else{
        StatusCode = '500'
        StatusMessage = 'Internal Server Error'
        $body = ``
        $headers = `Server: Apache/2.2.14 (Win32)\nContent-Length: ${$body.length}\nConnection: Closed\nContent-Type: text/html; charset=utf-8` 
    }
    outputHttpResponse(StatusCode, StatusMessage , $headers, $body)
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

http = parseTcpStringAsHttpRequest(contents)
processHttpRequest(http.method, http.uri, http.headers, http.body)
