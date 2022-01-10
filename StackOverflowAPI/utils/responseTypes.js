const notFound = (res, message, others) => {
    res.status(404).json({
        message: message || "Not Found!",
        ...others
    });
};

const methodNotAllowed = (res, message, others) => {
    res.status(405).json({
        message: message || "Method not allowed!",
        ...others
    });
};

const internalServerError = (res, message, others) => {
    res.status(500).json({
        message: message || "Internal Server Error!",
        ...others
    });
};

const requestConflict = (res, message, others) => {
    res.status(409).json({
        message: message || "Conflicting Request!",
        ...others
    });
};

const unauthorizedError = (res, message, others) => {
    res.status(401).json({
        message: message || "Unauthorized Request!",
        ...others
    })
}

const createSuccess = (res, message, others) => {
    res.status(201).json({
        message: message || "Created Successfully!",
        ...others
    })
}

const fetchSuccess = (res, message, others) => {
    res.status(200).json({
        mesaage: message || "Requested resource fetched successfully!",
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
