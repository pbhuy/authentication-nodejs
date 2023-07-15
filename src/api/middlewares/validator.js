const ResponseError = require('../helpers/error')
const { sendError } = require('../helpers/response')

const validateParams = (schema, name) => {
    return (req, res, next) => {
        const isValid = schema.validate({ id: req.params[name] })
        if (isValid.error) {
            sendError(res, new ResponseError(400, isValid.error.message))
        } else next()
    }
}
const validateBody = (schema) => {
    return (req, res, next) => {
        const isValid = schema.validate(req.body)
        if (isValid.error) {
            sendError(res, new ResponseError(400, isValid.error.message))
        } else next()
    }
}

module.exports = { validateParams, validateBody }
