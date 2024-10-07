const express   = require('express')
const app       = express()
const mysql     = require('mysql2')
const moment    = require('moment')
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

const model_jabatan = require('./model/model_jabatan')
const model_agama   = require('./model/model_agama')
const model_karyawan= require('./model/model_karyawan')

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
        karyawan: await model_karyawan.getAll_karyawan(),
        notification: req.query.notification,
    }
    res.render('page-karyawan', data)
})

app.get('/karyawan/detail/:id_karyawan', async function(req, res) {
    // ambil data satu karyawan saja
    let data = {
        satuKaryawan: await model_karyawan.getOne_karyawan(req.params.id_karyawan)
    }
    res.render('page-karyawan-detail', data)
})

app.get('/karyawan/tambah', async function(req, res) {
    let data = {
        jabatan: await model_jabatan.getAll_jabatan(),
        agama: await model_agama.getAll_agama(),
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
            let insert = await model_karyawan.insert_karyawan(req)
    
            // 3. proses pengecekan (terinput ke db atau gagal)
            if (insert.affectedRows > 0) {
                // 4a. jika berhasil, tampilkan pesan sukses
                res.redirect('/karyawan?notification=Berhasil menambah data karyawan')
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

app.get('/karyawan/hapus/:id_karyawan', async function(req, res){
    try {
        let hapus = await model_karyawan.hapusKaryawan(req.params.id_karyawan)
        if (hapus.affectedRows > 0) {
            res.redirect('/karyawan')
        }
    } catch (error) {
        throw error
    }
})

app.get('/karyawan/edit/:id_karyawan', async function(req, res) {
    let data = {
        satuKaryawan: await model_karyawan.getOne_karyawan(req.params.id_karyawan),
        jabatan: await model_jabatan.getAll_jabatan(),
        agama: await model_agama.getAll_agama(),
        moment: moment,
    }
    res.render('page-karyawan-form-edit', data)
})

app.post('/karyawan/proses-update-data/:id_karyawan', async function(req, res) {
    try {
        let update = await model_karyawan.update_karyawan(req)
        if (update.affectedRows > 0) {
            res.redirect('/karyawan?notification=Berhasil perbarui data karyawan')
        }
    } catch (error) {
        throw error
    }
})

// sambungkan ke server
app.listen(3000, () => {
    console.log('Server aktif, buka http://localhost:3000')
})