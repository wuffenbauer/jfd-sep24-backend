// cara penulisan pertama:
// let namaDepan       = 'Amirah'
// let namaBelakang    = 'Puspadewi'
// let namaLengkap     = namaDepan + ' ' + namaBelakang
// let alamat          = 'Pamulang, Tangerang Selatan'

// module.exports  = {
//     namaDepan, namaBelakang, namaLengkap, alamat
// }

// cara penulisan kedua:
let namaDepan       = 'Amirah'
let namaBelakang    = 'Puspadewi'
module.exports      = {
    namaLengkap : namaDepan + ' ' + namaBelakang,
    alamat      : 'Pamulang, Tangerang Selatan',
}