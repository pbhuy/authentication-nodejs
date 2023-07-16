const jwt = require('jsonwebtoken')

const encodedToken = (user) => {
    const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        {
            expiresIn: '1d'
        }
    )
    return token
}
const decodedToken = (token) => {
    const user = jwt.verify(token, process.env.JWT_SECRET)
    return user
}

module.exports = { encodedToken, decodedToken }
