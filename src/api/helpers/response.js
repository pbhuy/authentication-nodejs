const send = (res, status, data, message) => {
    return res.status(status).json({
        success: true,
        data,
        message
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
