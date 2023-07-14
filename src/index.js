const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const msg = require('../src/api/helpers/constants')
const { sendError } = require('../src/api/helpers/response')
const RequestError = require('../src/api/helpers/error')
const router = require('../src/api/routes')

// Environment variables
dotenv.config()

// CONNECT MONGODB
mongoose
    .connect(process.env.DATABASE_URI)
    .then(console.log('Connect to mongo successfully'))
    .catch((error) => {
        console.log('Connect failure', error)
    })

// MIDDLEWARES

// json parser
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// morgan
app.use(morgan('dev'))

// cors
app.use(cors({ credentials: true }))

// ROUTES
app.use('/api/v1', router)

// HANDLE ERROR

// 404 Not Found Error
app.use((req, res, next) => {
    const error = new RequestError(404, msg.NOT_FOUND)
    next(error)
})

// 500 Internal Server Error
app.use((err, req, res, next) => {
    const error = new RequestError(
        err.status || 500,
        err.message || msg.SERVER_ERROR
    )
    sendError(res, error)
})

module.exports = app
