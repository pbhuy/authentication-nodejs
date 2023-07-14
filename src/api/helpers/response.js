const send = (res, status, data, message) => {
    return res.status(status).json({
        success: true,
        message,
        data
    })
}

const sendError = (res, err) => {
    return res.status(err.status).json({
        success: false,
        error: {
            message: err.message
        }
    })
}

module.exports = { send, sendError }
