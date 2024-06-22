const ApiError = require("../exceptions/api-error");
const tokenService = require("../services/token-service");

module.exports = function (req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        if(!authHeader) {
            return next(ApiError.unAuthorizedError())
        }
        const accessToken = authHeader.split(" ")[1];
        const userData = tokenService.validateAccessToken(accessToken).payload;

        if (!accessToken || !userData) {
            return next(ApiError.unAuthorizedError())
        }

        req.user = userData;
        next();
    } catch (e) {
        next(e);
    }
}