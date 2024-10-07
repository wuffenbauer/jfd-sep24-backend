module.exports = {
    halaman_pendidikan: function(req, res) {
        let profil = {
            nama: 'Aji Kowiyu',
            s1: 'ITB Swadharma: Sistem Informasi',
            smk: 'SMK Remaja Pluit: Akuntansi',
        }
        res.render('page-pendidikan', profil)
    }
}