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

const model_jabatan     = require('./model/model_jabatan')
const model_agama       = require('./model/model_agama')
const model_karyawan    = require('./model/model_karyawan')

const cont_default      = require('./controller/controller_default')
const cont_pendidikan   = require('./controller/controller_pendidikan')
const cont_karyawan     = require('./controller/controller_karyawan')

// untuk mengambil data yang ter-encoded (enkripsi)
// yang dikirimkan melalui protokol http
app.use(express.urlencoded({extended:false}))
app.set('view engine', 'ejs')   // setting penggunaan template engine untuk express
app.set('views', './view-ejs')  // setting penggunaan folder untuk menyimpan file .ejs

// function render('nama file')
// nama file-nya wajib berekstensi .ejs
// otomatis mengambil file .ejs yang ada di folder view-ejs

// bikin rute
app.get('/', cont_default.halaman_beranda)
app.get('/pendidikan', cont_pendidikan.halaman_pendidikan)
app.get('/karyawan', cont_karyawan.halaman_list_semua_karyawan)
app.get('/karyawan/detail/:id_karyawan', cont_karyawan.halaman_karyawan_detail)
app.get('/karyawan/tambah', cont_karyawan.halaman_karyawan_form_tambah)

let formValidasiInsert = [
    body('form_nik').notEmpty().isNumeric(),
    body('form_nama').notEmpty().isString(),
]

app.post('/karyawan/proses-insert-data', formValidasiInsert, cont_karyawan.proses_insert_karyawan)
app.get('/karyawan/hapus/:id_karyawan', cont_karyawan.proses_hapus)
app.get('/karyawan/edit/:id_karyawan', cont_karyawan.halaman_karyawan_form_edit)

app.post('/karyawan/proses-update-data/:id_karyawan', cont_karyawan.proses_update)

// sambungkan ke server
app.listen(3000, () => {
    console.log('Server aktif, buka http://localhost:3000')
})