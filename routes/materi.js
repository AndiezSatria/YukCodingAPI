const errors = require('restify-errors')
const Matkul = require('../models/Matkul')
const Materi = require('../models/Materi')

module.exports = server => {
    // Get all materi
    server.get('/materi', async (req, res, next) => {
        try {
            const materi = await Materi.find({})
            res.send(materi)
            next()
        } catch(err) {
            return next(new errors.InvalidContentError(err))
        }
    })

    // Get single materi with materi id
    server.get('/materi/:id', async (req, res, next) => {
        try {
            const materi = await Materi.findById(req.params.id)
            res.send(materi)
            next()
        } catch(err) {
            return next(new errors.ResourceNotFoundError(`There is no category with ID ${req.params.id}`))
        }
    })

    // Add materi
    server.post('/materi', async (req, res, next) => {
        if(!req.is('application/json')) {
            return next(new errors.InvalidContentError("Expects 'application/json'"))
        }

        const { nama, deskripsi, nama_mk } = req.body
        const mk = await Matkul.findOne({ nama: nama_mk })
        const mk_id = mk._id

        const matkul = new Materi({
            nama,
            deskripsi,
            "id_mk": mk_id
        })

        try {
            const newMatkul = await matkul.save()
            res.send(201)
            next()
        } catch (err) {
            return next(new errors.InternalError(err.message))
        }
    })

    //  Update materi
    server.put('/materi/:id', async (req, res, next) => {
        if(!req.is('application/json')) {
            return next(new errors.InvalidContentError("Expects 'application/json'"))
        }

        try {
            const materi = await Materi.findOneAndUpdate({ _id: req.params.id }, req.body)
            res.send(200)
            next()
        } catch (err) {
            return next(new errors.ResourceNotFoundError(`Tidak ada mata kuliah dengan ID : ${req.params.id}`))
        }
    })

    // Delete materi
    server.del('/materi/:id', async (req, res, next) => {
        if(!req.is('application/json')) {
            return next(new errors.InvalidContentError("Expects 'application/json'"))
        }

        try {
            const materi = await Materi.findOneAndRemove({ _id: req.params.id })
            res.send(204)
            next()
        } catch (err) {
            return next(new errors.ResourceNotFoundError(`There is no category with ID ${req.params.id}`))
        }
    })
}