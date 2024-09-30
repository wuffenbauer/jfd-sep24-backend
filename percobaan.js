// memanggil modul bawaan dari node.js, yaitu http
// untuk membuat server http
const http = require('http')

http.createServer(function(request, response) {
    response.writeHead(200, {'Content-type': 'text/html'})
    // halaman utama
    if (request.url == '/') {        
        response.end('<h1>Welcome to My Website.</h1>')
    } else if (request.url == '/profil') {
        response.end(
            `<h1>Profil Saya</h1>
            <ul>
                <li>Nama lengkap: Amirah Puspadewi</li>
                <li>Nama panggilan: Ami</li>
                <li>Alamat: Pamulang, Tangerang Selatan</li>
                <li>Pekerjaan: Mahasiswa, Freelancer</li>
            </ul>`
        )
    } else if (request.url == '/hubungi-saya') {
        response.end(
            `<h1>Hubungi Saya</h1>
            <ul>
                <li>No. WA: 0856-3559-890</li>
                <li>Email: wuffenbauer@gmail.com</li>
            </ul>`
        )
    // untuk menangani url yang tidak ada:
    } else {
        response.end('<h1>404: Halaman tidak ditemukan.</h1>')
    }
}).listen(3000, function() {
    console.log('Server is on, go to http://localhost:3000')
})