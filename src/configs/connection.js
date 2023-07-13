const mongoose = require('mongoose')
const dotenv = require('dotenv').config()

const connection = async () => {
    try {
        return await mongoose.connect(process.env.DATABASE_URI)
    } catch (error) {
        console.log(error)
    }
}

module.exports = connection
