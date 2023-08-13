const mongoose = require('mongoose')

const Schema = mongoose.Schema

const commissionSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    mail: {
        type: String,
        required: true
    },
    request: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    colorSet: {
        type: String,
        required: true
    },
    detailSet: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Commission', commissionSchema)