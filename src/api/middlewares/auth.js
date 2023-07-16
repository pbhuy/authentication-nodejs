const message = require('../helpers/constants')
const ResponseError = require('../helpers/error')
const { decodedToken } = require('../helpers/token')

const verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization')
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) return next(new ResponseError(401, message.NO_AUTH_TOKEN))
    try {
        const user = decodedToken(token)
        req.user_id = user.id
        req.role = user.role
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = { verifyToken }
