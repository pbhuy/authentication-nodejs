const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const msg = require('../src/api/helpers/constants')
const { sendError } = require('../src/api/helpers/response')
const ResponseError = require('../src/api/helpers/error')
const router = require('../src/api/routes')
const connectToMongoDB = require('./configs/database')
const path = require('path')

// Environment variables
dotenv.config()

// CONNECT MONGODB
connectToMongoDB()

// STATIC FILE
app.use('/images', express.static(path.join(__dirname, 'uploads')))

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
    const error = new ResponseError(404, msg.NOT_FOUND)
    next(error)
})

// 500 Internal Server Error
app.use((err, req, res, next) => {
    const status = err.status ? err.status : 500
    const message = err.message ? err.message : msg.SERVER_ERROR
    if (!err) err = new ResponseError(status, message)
    else if (!err.status) err.status = status
    sendError(res, err)
})

module.exports = app
