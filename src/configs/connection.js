const mongoose = require('mongoose')
require('dotenv').config()

const uri = process.env.DATABASE_URI
const db_name = process.env.DB_NAME

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(`${uri}/${db_name}`)
        console.log('Connected to MongoDB')
    } catch (error) {
        console.error('Error connecting to MongoDB:', error)
        throw error
    }
}

module.exports = connectToMongoDB
