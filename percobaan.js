// memanggil modul bawaan dari node.js, yaitu http
// untuk membuat server http
const http = require('http')

http.createServer(function(request, response) {
    response.writeHead(200, {'Content-type': 'text/html'})
    // halaman utama
    if (request.url == '/') {        
        response.end(`
            <h1>Selamat datang di situs saya</h1>
            <br>
            <a href="/profil">Lihat profil`
        )
    } else if (request.url == '/profil') {
        let tahunLahir  = 1992
        let tahunIni    = 2024
        let umur        = tahunIni - tahunLahir
        response.end(
            `<h1>Profil Saya</h1>
            <ul>
                <li>Nama lengkap: Amirah Puspadewi</li>
                <li>Nama panggilan: Ami</li>
                <li>Alamat: Pamulang, Tangerang Selatan</li>
                <li>Pekerjaan: Mahasiswa, Freelancer</li>
                <li>Tempat, tanggal lahir: Jakarta, 13 Juni ${tahunLahir}</li>
                <li>Umur: ${umur} tahun</li>
            </ul>
            <br>
            <a href="/">Balik ke beranda`
        )
    // halaman hubungi saya
    } else if (request.url == '/hubungi-saya') {
        let kontak = {
            wa: '+628563559890',
            email: 'wuffenbauer@gmail.com',
            linkedin: 'linkedin/apuspadw',
            ig: '@wuffenbauer',
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
    // untuk menangani url yang tidak ada:
    } else {
        response.end('<h1>404: Halaman tidak ditemukan.</h1>')
    }
}).listen(3000, function() {
    console.log('Server is on, go to http://localhost:3000')
})