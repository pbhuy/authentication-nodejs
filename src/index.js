const express = require('express')
const app = express()
const morgan = require('morgan')
const msg = require('../src/api/helpers/constants')
const response = require('../src/api/helpers/response')
const RequestError = require('../src/api/helpers/error')
const router = require('../src/api/routes')

// CONNECT DATABASE
require('./configs/connection')()

// MIDDLEWARES

// json parser
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// morgan
app.use(morgan('dev'))

// ROUTES
app.use('/api/v1', router)

app.use((req, res, next) => {
    const error = new Error(404, msg.NOT_FOUND)
    next(error)
})

app.use((err, req, res, next) => {
    const error = new RequestError(
        err.status || 500,
        err.message || msg.SERVER_ERROR
    )
    response.sendError(res, error)
})

module.exports = app
