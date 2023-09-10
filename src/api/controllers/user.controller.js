const User = require('../models/user.model')
const { send, sendError } = require('../helpers/response')
const ResponseError = require('../helpers/error')
const schemas = require('../validations/schemas')
const msg = require('../helpers/constants')
const { encodedToken, decodedToken } = require('../helpers/token')

const getUsers = async (req, res, next) => {
    try {
        const users = await User.find()
        send(res, 200, users)
    } catch (error) {
        next(error)
    }
}

const getUserByID = async (req, res, next) => {
    try {
        const _id = req.params.id
        const user = await User.findById(_id)
        if (!user) return next()
        send(res, 200, user)
    } catch (error) {
        next(error)
    }
}

const createUser = async (req, res, next) => {
    try {
        const user = new User(req.body)
        if (!user) return next()
        await user.save()
        send(res, 201, user)
    } catch (error) {
        next(error)
    }
}

const signUp = async (req, res, next) => {
    try {
        const user = new User(req.body)
        // check if email is exist
        const found_user = await User.findOne({ email: user.email })
        if (found_user) {
            return next(new ResponseError(409, msg.EXIST_CREDENTIALS))
        }
        await user.save()
        send(res, 201, user, 'Sign up successfully')
    } catch (error) {
        next(error)
    }
}

const signIn = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        // check if email is found
        if (!user) sendError(res, new ResponseError(400, msg.EMAIL_NOT_EXIST))
        else {
            // check if password is verified
            const isValid = await user.verifyPassword(password)
            if (!isValid)
                sendError(res, new ResponseError(401, msg.INVALID_CREDENTIALS))
            else {
                const token = encodedToken(user)
                res.setHeader('Authorization', token)
                send(res, 200, user, 'Sign in successfully')
            }
        }
    } catch (error) {
        next(error)
    }
}

const updateUser = async (req, res, next) => {
    try {
        const _id = req.id
        const new_user = req.body
        const imageURL = req.file
            ? `http://localhost:3000/images/${req.file.filename}`
            : undefined
        new_user.imageURL = imageURL
        const user = await User.findOneAndUpdate({ _id }, new_user, {
            new: true
        })
        send(res, 200, user)
    } catch (error) {
        next(error)
    }
}

const deleteUser = async (req, res, next) => {
    try {
        const _id = req.params.id
        const user = await User.findByIdAndDelete(_id)
        send(res, 200, user, 'Delete successfully')
    } catch (error) {
        next(error)
    }
}

const deleteAllUsers = async (req, res, next) => {
    try {
        await User.deleteMany({})
        send(res, 204)
    } catch (error) {
        next(error)
    }
}

const resetPassword = async (req, res, next) => {
    try {
        const { password } = req.body
        const token = req.headers.authorization.split(' ')[1]
        const decode = decodedToken(token)
        const user = await User.findById(decode.id)
        user.password = password
        await user.save()
        send(res, 200, user, 'Reset password successfully')
    } catch (error) {
        next(error)
    }
}

const forgetPassword = async (req, res, next) => {
    try {
        const { email } = req.body
        send(res, 200, email, 'Forget password successfully')
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getUsers,
    getUserByID,
    createUser,
    signUp,
    signIn,
    updateUser,
    deleteUser,
    deleteAllUsers,
    resetPassword,
    forgetPassword
}
