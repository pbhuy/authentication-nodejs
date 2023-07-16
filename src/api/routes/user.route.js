const userRoute = require('express').Router()
const userController = require('../controllers/user.controller')
const { verifyToken } = require('../middlewares/auth')
const { validateParams, validateBody } = require('../middlewares/validator')
const schemas = require('../validations/schemas')

userRoute
    .get(
        '/:id',
        validateParams(schemas.id_schema, 'id'),
        userController.getUserByID
    )
    .get('/', userController.getUsers)
    .post('/', validateBody(schemas.user_schema), userController.createUser)
    .post('/signup', validateBody(schemas.user_schema), userController.signUp)
    .post(
        '/signin',
        validateBody(schemas.user_login_schema),
        userController.signIn
    )
    .put(
        '/:id',
        validateParams(schemas.id_schema, 'id'),
        validateBody(schemas.user_schema),
        userController.updateUser
    )
    .patch('/reset', userController.resetPassword)
    .delete(
        '/:id',
        validateParams(schemas.id_schema, 'id'),
        userController.deleteUser
    )
    .delete('/', verifyToken, userController.deleteAllUsers)

module.exports = userRoute
