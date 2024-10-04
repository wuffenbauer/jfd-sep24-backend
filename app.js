const express   = require('express')
const app       = express()
const mysql     = require('mysql2')
const {body, query, validationResult} = require('express-validator')

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

// untuk mengambil data yang ter-encoded (enkripsi)
// yang dikirimkan melalui protokol http
app.use(express.urlencoded({extended:false}))
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

function getAll_jabatan() {
    return new Promise((resolve, reject) => {
        let sqlSyntax = 
        `SELECT * FROM jabatan`

        db.query(sqlSyntax, function(errorSql, hasil) {
            if (errorSql) {
                reject(errorSql)
            } else {
                resolve(hasil)
            }
        })
    })
}

function getAll_agama() {
    return new Promise((resolve, reject) => {
        let sqlSyntax = 
        `SELECT * FROM agama`

        db.query(sqlSyntax, function(errorSql, hasil) {
            if (errorSql) {
                reject(errorSql)
            } else {
                resolve(hasil)
            }
        })
    })
}

app.get('/karyawan/tambah', async function(req, res) {
    let data = {
        jabatan: await getAll_jabatan(),
        agama: await getAll_agama(),
    }
    res.render('page-karyawan-form-tambah', data)
})

let formValidasiInsert = [
    body('form_nik').notEmpty().isNumeric(),
    body('form_nama').notEmpty().isString(),
]

app.post('/karyawan/proses-insert-data', formValidasiInsert, async function(req, res) {
    const errors = validationResult(req)
    // jika lolos validasi
    if (errors.isEmpty()) {
        // 1. tangkap isi data dari masing-masing form
        // req.body             => ambil semua inputan dari form
        // req.body.nama_form   => ambil satuan inputan dari form
    
        try {
            // 2. kirim sebagai script SQL
            let insert = await insert_karyawan(req)
    
            // 3. proses pengecekan (terinput ke db atau gagal)
            if (insert.affectedRows > 0) {
                // 4a. jika berhasil, tampilkan pesan sukses
                res.redirect('/karyawan')
                // console.log('Berhasil input ke database')
            }
        } catch (error) {
            // 4b. jika gagal, tampilkan pesan error
            throw error
        }
    } // jika tidak lolos
    else {
        let errorData = {
            pesanError: errors.array()
        }
        errorData.pesanError[0].fields
        res.render('page-karyawan-form-tambah', errorData)
    }
})

function insert_karyawan(req) {
    return new Promise((resolve, reject) => {
        let sqlSyntax = 
        `INSERT INTO karyawan
        (nama, nik, tanggal_lahir, alamat, jabatan, agama)
        VALUES
        (?, ?, ?, ?, null, null)`

        let sqlData = [
            req.body.form_nama,
            req.body.form_nik,
            req.body.form_tanggal_lahir,
            req.body.form_alamat,
        ]

        db.query(sqlSyntax, sqlData, function(errorSql, hasil) {
            if (errorSql) {
                reject(errorSql)
            } else {
                resolve(hasil)
            }
        })
    })
}

function hapusKaryawan(idkry) {
    return new Promise((resolve, reject) => {
        let sqlSyntax = 
        `DELETE FROM karyawan WHERE id = ?`

        db.query(sqlSyntax, [idkry], function(errorSql, hasil) {
            if (errorSql) {
                reject(errorSql)
            } else {
                resolve(hasil)
            }
        })
    })
}

app.get('/karyawan/hapus/:id_karyawan', async function(req, res){
    try {
        let hapus = await hapusKaryawan(req.params.id_karyawan)
        if (hapus.affectedRows > 0) {
            res.redirect('/karyawan')
        }
    } catch (error) {
        throw error
    }
})

// sambungkan ke server
app.listen(3000, () => {
    console.log('Server aktif, buka http://localhost:3000')
})