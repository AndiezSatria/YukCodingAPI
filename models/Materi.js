const mongoose = require('mongoose')
const timestamp = require('mongoose-timestamp')

const MateriSchema = new mongoose.Schema({
    nama: {
        type: String,
        required: true,
        trim: true
    },
    deskripsi: {
        type: String,
        required: false,
        trim: false
    },
    id_mk: {
        type: String,
        required: true,
        trim: true
    }
})

MateriSchema.plugin(timestamp)

const Materi = mongoose.model('Materi', MateriSchema)
module.exports = Materi