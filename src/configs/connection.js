const mongoose = require('mongoose')
require('dotenv').config()

const connection = async () => {
    try {
        return await mongoose.connect(process.env.DATABASE_URI)
    } catch (error) {
        console.log(error)
    }
}

module.exports = connection
