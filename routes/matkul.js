const errors = require('restify-errors')
const Matkul = require('../models/Matkul')

module.exports = server => {
    // Get matkul
    server.get('/matkul', async (req, res, next) => {
        try {
            const matkul = await Matkul.find({})
            res.send(matkul)
            next()
        } catch(err) {
            return next(new errors.InvalidContentError(err))
        }
    })

    // Get single matkul
    server.get('/matkul/:id', async (req, res, next) => {
        try {
            const matkul = await Matkul.findById(req.params.id)
            res.send(matkul)
            next()
        } catch(err) {
            return next(new errors.ResourceNotFoundError(`There is no category with ID ${req.params.id}`))
        }
    })

    // Add matkul
    server.post('/matkul', async (req, res, next) => {
        if(!req.is('application/json')) {
            return next(new errors.InvalidContentError("Expects 'application/json'"))
        }

        const { nama, deskripsi } = req.body

        const matkul = new Matkul({
            nama,
            deskripsi
        })

        try {
            const newMatkul = await matkul.save()
            res.send(201)
            next()
        } catch (err) {
            return next(new errors.InternalError(err.message))
        }
    })

    //  Update matkul
    server.put('/matkul/:id', async (req, res, next) => {
        if(!req.is('application/json')) {
            return next(new errors.InvalidContentError("Expects 'application/json'"))
        }

        try {
            const matkul = await Matkul.findOneAndUpdate({ _id: req.params.id }, req.body)
            res.send(200)
            next()
        } catch (err) {
            return next(new errors.ResourceNotFoundError(`Tidak ada mata kuliah dengan ID : ${req.params.id}`))
        }
    })

    // Delete matkul
    server.del('/matkul/:id', async (req, res, next) => {
        if(!req.is('application/json')) {
            return next(new errors.InvalidContentError("Expects 'application/json'"))
        }

        try {
            const matkul = await Matkul.findOneAndRemove({ _id: req.params.id })
            res.send(204)
            next()
        } catch (err) {
            return next(new errors.ResourceNotFoundError(`There is no category with ID ${req.params.id}`))
        }
    })
}