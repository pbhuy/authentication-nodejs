const User = require('../models/user.model')
const { send, sendError } = require('../helpers/response')
const RequestError = require('../helpers/error')

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
        send(res, 201, user, 'Sign up successfully')
    } catch (error) {
        next(error)
    }
}
const signUp = async (req, res, next) => {
    try {
        const user = new User(req.body)
        await user.save()
        send(res, 201, user, 'Sign up successfully')
    } catch (error) {
        next(error)
    }
}

const signIn = async (req, res, next) => {
    try {
        const user = new User(req.body)
        await user.save()
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

module.exports = {
    getUsers,
    getUserByID,
    createUser,
    signUp,
    signIn,
    updateUser,
    deleteUser,
    deleteAllUsers
}
