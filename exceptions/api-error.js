module.exports = class ApiError extends Error {
    status;
    errors;

    constructor(status, message, errors = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static unAuthorizedError(message = "User is not authorized") {
        return new ApiError(401, message)
    }

    static notFound(message) {
        return new ApiError(404, message);
    }

    static BadRequest(message) {
        return new ApiError(400, message);
    }


}