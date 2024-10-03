const express   = require('express')
const app       = express()
const mysql     = require('mysql2')

// sambungkan ke mysql
const db = mysql.createConnection({
    host    : 'localhost',
    user    : 'root',
    password: '',
    database: 'dbjfd_sep24',
})

// buka koneksi
db.connect()

function getAll_karyawan() {
    return new Promise((resolve, reject) => {
        let sqlSyntax = 
        `SELECT
            kry.*, jbt.nama AS jabatan_nama, 
            jbt.singkatan AS jabatan_singkatan,
            agm.nama AS agama_nama
        FROM karyawan AS kry
        LEFT JOIN jabatan AS jbt ON jbt.id = kry.jabatan
        LEFT JOIN agama AS agm ON agm.id = kry.agama`

        db.query(sqlSyntax, function(errorSql, hasil) {
            if (errorSql) {
                reject(errorSql)
            } else {
                resolve(hasil)
            }
        })
    })
}

function getOne_karyawan(idkry) {
    return new Promise((resolve, reject) => {
        let sqlSyntax = 
        `SELECT
            kry.*, jbt.nama AS jabatan_nama, 
            jbt.singkatan AS jabatan_singkatan,
            agm.nama AS agama_nama
        FROM karyawan AS kry
        LEFT JOIN jabatan AS jbt ON jbt.id = kry.jabatan
        LEFT JOIN agama AS agm ON agm.id = kry.agama
        WHERE kry.id = ?`

        db.query(sqlSyntax, [idkry], function(errorSql, hasil) {
            if (errorSql) {
                reject(errorSql)
            } else {
                resolve(hasil)
            }
        })
    })
}

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

app.get('/karyawan', async function(req, res) {
    // proses penarikan data
    let data = {
        karyawan: await getAll_karyawan()
    }
    res.render('page-karyawan', data)
})

app.get('/karyawan/detail/:id_karyawan', async function(req, res) {
    // ambil data satu karyawan saja
    let data = {
        satuKaryawan: await getOne_karyawan(req.params.id_karyawan)
    }
    res.render('page-karyawan-detail', data)
})

// sambungkan ke server
app.listen(3000, () => {
    console.log('Server aktif, buka http://localhost:3000')
})