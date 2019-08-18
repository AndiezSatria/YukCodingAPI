const mongoose = require('mongoose')
const timestamp = require('mongoose-timestamp')

const MatkulSchema = new mongoose.Schema({
    nama: {
        type: String,
        required: true,
        trim: true
    },
    deskripsi: {
        type: String,
        required: false,
        trim: false
    }
})

MatkulSchema.plugin(timestamp)

const Matkul = mongoose.model('Matkul', MatkulSchema)
module.exports = Matkul