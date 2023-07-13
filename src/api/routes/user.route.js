const userRoute = require('express').Router()
const userController = require('../controllers/user.controller')

userRoute
    .get('/:id', userController.getUserByID)
    .get('/', userController.getUsers)
    .post('/', userController.createUser)
    .put('/:id', userController.updateUser)
    .delete('/:id', userController.deleteUser)

module.exports = userRoute
