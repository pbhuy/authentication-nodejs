const http = require('http')
const app = require('./index.js')

const port = process.env.PORT || 3000

http.createServer(app).listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
