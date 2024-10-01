const express   = require('express')
const app       = express()

app.set('view engine', 'ejs')   // setting penggunaan template engine untuk express
app.set('views', './view-ejs')  // setting penggunaan folder untuk menyimpan file .ejs

// function render('nama file')
// nama file-nya wajib berekstensi .ejs
// otomatis mengambil file .ejs yang ada di folder view-ejs

// bikin rute
app.get('/', function(req, res) {
    res.render('beranda')
})

app.get('/pendidikan', function(req, res) {
    let profil = {
        nama: 'Amirah Puspadewi',
        s1  : 'Universitas Terbuka - Sastra Inggris Bidang Minat Penerjemahan',
        sma : 'SMAN 2 Kota Tangerang Selatan - IPS',
    }
    res.render('page-pendidikan', profil)
})

app.get('/karyawan', function(req, res) {
    res.render('page-karyawan')
})

// sambungkan ke server
app.listen(3000, () => {
    console.log('Server aktif, buka http://localhost:3000')
})