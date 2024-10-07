const {body, query, validationResult} = require('express-validator')
const moment            = require('moment')

const model_jabatan     = require('../model/model_jabatan')
const model_agama       = require('../model/model_agama')
const model_karyawan    = require('../model/model_karyawan')

module.exports = {
    halaman_list_semua_karyawan: async function(req, res) {
        // proses penarikan data
        let data = {
            karyawan: await model_karyawan.getAll_karyawan(),
            notification: req.query.notification,
        }
        res.render('page-karyawan', data)
    },

    halaman_karyawan_detail: async function(req, res) {
        // ambil data satu karyawan saja
        let data = {
            satuKaryawan: await model_karyawan.getOne_karyawan(req.params.id_karyawan)
        }
        res.render('page-karyawan-detail', data)
    },

    halaman_karyawan_form_tambah: async function(req, res) {
        let data = {
            jabatan: await model_jabatan.getAll_jabatan(),
            agama: await model_agama.getAll_agama(),
        }
        res.render('page-karyawan-form-tambah', data)
    },

    proses_insert_karyawan: async function(req, res) {
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
    },

    proses_hapus: async function(req, res){
        try {
            let hapus = await model_karyawan.hapusKaryawan(req.params.id_karyawan)
            if (hapus.affectedRows > 0) {
                res.redirect('/karyawan')
            }
        } catch (error) {
            throw error
        }
    },

    halaman_karyawan_form_edit: async function(req, res) {
        let data = {
            satuKaryawan: await model_karyawan.getOne_karyawan(req.params.id_karyawan),
            jabatan: await model_jabatan.getAll_jabatan(),
            agama: await model_agama.getAll_agama(),
            moment: moment,
        }
        res.render('page-karyawan-form-edit', data)
    },

    proses_update: async function(req, res) {
        try {
            let update = await model_karyawan.update_karyawan(req)
            if (update.affectedRows > 0) {
                res.redirect('/karyawan?notification=Berhasil perbarui data karyawan')
            }
        } catch (error) {
            throw error
        }
    },

    
}