// syarat menggunakan variabel/object yang ada di file lain:
// 1. panggil file
// 2. pastikan file yang dipanggil sudah mengekspor variabel
// 3. panggil (file.variabel)

// cara penulisan ke-1
const dp  = require('./data_pribadi')
console.log(dp.namaLengkap)
console.log(dp.alamat)

// cara penulisan ke-2
console.log(require('./data_pribadi').namaLengkap)
console.log(require('./data_pribadi').alamat)