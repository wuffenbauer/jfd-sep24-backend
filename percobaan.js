// memanggil modul bawaan dari node.js, yaitu http
// untuk membuat server http
const http  = require('http')
const fs    = require('fs')

http.createServer(function(request, response) {
    response.writeHead(200, {'Content-type': 'text/html'})
    // halaman utama
    if (request.url == '/') {        
        fs.createReadStream('./view/halaman-utama.html').pipe(response)
    } // halaman profil
    else if (request.url == '/profil') {
        fs.createReadStream('./view/halaman-profil.html').pipe(response)
    } // halaman hubungi saya
    else if (request.url == '/hubungi-saya') {
        let kontak = {
            wa      : '+628563559890',
            email   : 'wuffenbauer@gmail.com',
            linkedin: 'linkedin/apuspadw',
            ig      : '@wuffenbauer',
        }
        response.end(
            `<h1>Hubungi Saya</h1>
            <ul>
                <li>WhatsApp : ${kontak.wa}</li>
                <li>Email    : ${kontak.email}</li>
                <li>LinkedIn : ${kontak.linkedin}</li>
                <li>Instagram: ${kontak.ig}</li>
            </ul>
            <br>
            <a href="/">Balik ke beranda`
        )
    
    } // untuk menangani url yang tidak ada:
    else {
        response.end('<h1>404: Halaman tidak ditemukan.</h1>')
    }
}).listen(3000, function() {
    console.log('Server is on, go to http://localhost:3000')
})