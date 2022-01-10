const notFound = (res, message, others) => {
    res.send(404).json({
        message: message || "Not Found!",
        ...others
    });
};

const methodNotAllowed = (res, message, others) => {
    res.send(405).json({
        message: message || "Method not allowed!",
        ...others
    });
};

const internalServerError = (res, message, others) => {
    res.send(500).json({
        message: message || "Internal Server Error!",
        ...others
    });
};

const requestConflict = (res, message, others) => {
    res.send(409).json({
        message: message || "Conflicting Request!",
        ...others
    });
};

const unauthorizedError = (res, message, others) => {
    res.send(401).json({
        message: message || "Unauthorized Request!",
        ...others
    })
}

const createSuccess = (res, message, others) => {
    res.send(201).json({
        message: message || "Created Successfully!",
        ...others
    })
}

const fetchSuccess = (res, message, others) => {
    res.send(200).json({
        mesaage: message || "Request resource fetched successfully!",
        ...others
    })
}

module.exports = {
    notFound,
    methodNotAllowed,
    internalServerError,
    requestConflict,
    unauthorizedError,
    createSuccess,
    fetchSuccess
};
