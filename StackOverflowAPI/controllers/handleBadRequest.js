const notFoundError = (_, res) => {
    res.status(404).json({
        message: "The requested route is not available!" 
    })
}

const methodNotAllowedError = (_, res) => {
    res.status(405).json({
        message: "This method is not supported or route doesn't exist!"
    })
}

module.exports = {notFoundError, methodNotAllowedError};