const User = require('../models/user.model')
const response = require('../helpers/response')
const RequestError = require('../helpers/error')

const getUsers = async (req, res, next) => {
    try {
        const users = await User.find()
        response.send(res, 200, users, 'get all users successfully')
    } catch (error) {
        next(error)
    }
}

const getUserByID = async (req, res, next) => {
    try {
        const user_id = req.params.id
        const user = await User.findById(user_id)
        response.send(res, 200, user, 'get user by id successfully')
    } catch (error) {
        next(error)
    }
}

const createUser = async (req, res, next) => {
    try {
        const user = new User(req.body)
        await user.save()
        response.send(res, 201, user, 'create new user successfully')
    } catch (error) {
        next(error)
    }
}

const updateUser = async (req, res, next) => {
    try {
        const user_id = req.params.id
        const newUser = req.body
        await User.findByIdAndUpdate(user_id, newUser)
        const user = await User.findById(user_id)
        response.send(res, 200, user, 'update user by id successfully')
    } catch (error) {
        next(error)
    }
}
const deleteUser = async (req, res, next) => {
    try {
        const user_id = req.params.id
        const user = await User.findByIdAndDelete(user_id)
        response.send(res, 200, user, 'delete user by id successfully')
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getUsers,
    getUserByID,
    createUser,
    updateUser,
    deleteUser
}
