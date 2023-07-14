const http = require('http')
const app = require('./')

const port = process.env.PORT || 3000

http.createServer(app).listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
