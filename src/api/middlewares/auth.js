const message = require('../helpers/constants')
const ResponseError = require('../helpers/error')
const { decodedToken } = require('../helpers/token')

const verifyToken = function (req, res, next) {
    const authHeader = req.header('Authorization')
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) return next(new ResponseError(401, message.NO_AUTH_TOKEN))
    try {
        const user = decodedToken(token)
        req.id = user.id
        req.role = user.role
        next()
    } catch (error) {
        next(error)
    }
}

const verifyTokenAndAuthorize = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.role === 'user') next()
        else return next(new ResponseError(403, message.ACCESS_DENIED))
    })
}
const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.role === 'admin') next()
        else return next(new ResponseError(403, message.ACCESS_DENIED))
    })
}

module.exports = { verifyTokenAndAdmin, verifyTokenAndAuthorize, verifyToken }
