const { notFound, methodNotAllowed } = require("../utils/responseTypes");

const notFoundError = (_, res) => {
    return notFound(res, "Can't find the requested resource!");
};

const methodNotAllowedError = (_, res) => {
    return methodNotAllowed(res, "This method is not supported or route doesn't exist!");
};

module.exports = { notFoundError, methodNotAllowedError };
