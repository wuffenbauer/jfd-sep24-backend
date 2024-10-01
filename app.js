const express   = require('express')
const app       = express()

// bikin rute
app.get('/', function(req, res) {
    res.send('<h1>Hello World</h1>')
})

app.get('/pendidikan', function(req, res) {
    res.send('<h1>Riwayat Pendidikan</h1>')
})

app.get('/karyawan', function(req, res) {
    res.send('<h1>List Karyawan</h1>')
})

// 
app.listen(3000, () => {
    console.log('Server aktif, buka http://localhost:3000')
})