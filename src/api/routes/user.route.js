const userRoute = require('express').Router()
const userController = require('../controllers/user.controller')

userRoute
    .get('/:id', userController.getUserByID)
    .get('/', userController.getUsers)
    .post('/', userController.createUser)
    .post('/signup', userController.signUp)
    .post('/signin', userController.signIn)
    .put('/:id', userController.updateUser)
    .delete('/:id', userController.deleteUser)
    .delete('/', userController.deleteAllUsers)

module.exports = userRoute
