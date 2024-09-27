// memanggil modul bawaan dari node.js, yaitu http
// untuk membuat server http
const http = require('http')

http.createServer(function(request, response) {
    response.writeHead(200, {'Content-type': 'text/plain'})
    response.end('Hello, this script is generated from NodeJS backend.')
}).listen(3000, function() {
    console.log('Server is active, go to http://localhost:3000')
})

// tes nambah komentar
// kirim ke 2x