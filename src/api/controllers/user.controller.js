const User = require('../models/user.model')
const { send, sendError } = require('../helpers/response')
const ResponseError = require('../helpers/error')
const schemas = require('../validations/schemas')
const msg = require('../helpers/constants')

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
        send(res, 200, user)
    } catch (error) {
        next(error)
    }
}

const createUser = async (req, res, next) => {
    try {
        const user = new User(req.body)
        await user.save()
        send(res, 201, user)
    } catch (error) {
        next(error)
    }
}

const signUp = async (req, res, next) => {
    try {
        const user = new User(req.body)
        // check email is exist
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
        if (!user) sendError(res, new ResponseError(409, msg.EXIST_CREDENTIALS))
        const isValid = await user.verifyPassword(password)
        if (!isValid)
            sendError(res, new ResponseError(403, msg.INVALID_CREDENTIALS))

        send(res, 201, user, 'Sign in successfully')
    } catch (error) {
        next(error)
    }
}

const updateUser = async (req, res, next) => {
    try {
        const _id = req.params.id
        const new_user = req.body
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
        send(res, 200, undefined, 'Delete all users successfully')
    } catch (error) {
        next(error)
    }
}

const resetPassword = async (req, res, next) => {
    try {
        await User.deleteMany({})
        send(res, 200, undefined, 'Delete all users successfully')
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
    resetPassword
}
