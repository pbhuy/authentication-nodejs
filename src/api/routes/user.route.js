const userRoute = require('express').Router()
const userController = require('../controllers/user.controller')
const {
    verifyTokenAndAuthorize,
    verifyTokenAndAdmin,
    verifyToken
} = require('../middlewares/auth')
const { validateParams, validateBody } = require('../middlewares/validator')
const schemas = require('../validations/schemas')
const multer = require('multer')
const multerConfig = require('../../configs/multer')

const upload = multer(multerConfig)

userRoute
    .get(
        '/:id',
        validateParams(schemas.id_schema, 'id'),
        userController.getUserByID
    )
    .get('/', userController.getUsers)
    .post('/', validateBody(schemas.user_schema), userController.createUser)
    .post(
        '/signup',
        validateBody(schemas.user_signup_schema),
        userController.signUp
    )
    .post(
        '/signin',
        validateBody(schemas.user_signin_schema),
        userController.signIn
    )
    .post('/forget', userController.forgetPassword)
    .put(
        '/',
        validateBody(schemas.user_update_schema),
        verifyTokenAndAuthorize,
        upload.single('imageURL'),
        userController.updateUser
    )
    .patch('/reset', userController.resetPassword)
    .delete(
        '/:id',
        validateParams(schemas.id_schema, 'id'),
        verifyTokenAndAdmin,
        userController.deleteUser
    )
    .delete('/', verifyToken, userController.deleteAllUsers)

module.exports = userRoute
