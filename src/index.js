const express = require('express')
const app = express()
const morgan = require('morgan')

// MIDDLEWARES

// json parser
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// morgan
app.use(morgan('dev'))

app.get('/', (req, res) => {
    res.send('Hello world')
})

module.exports = app
