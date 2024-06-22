const jwt = require("jsonwebtoken");
const Token = require("../models/Token");
const ApiError = require("../exceptions/api-error");
module.exports = new class tokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign({payload}, process.env.JWT_ACCESS_SECRET, {
            expiresIn: "30m"
        });
        const refreshToken = jwt.sign({payload}, process.env.JWT_REFRESH_SECRET, {
            expiresIn: "7d"
        });
        return {
            accessToken,
            refreshToken
        }
    }

    validateAccessToken(accessToken) {
        try {
            return jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
        } catch(e) {
            throw ApiError.unAuthorizedError("The token is expired");
        }
    }

    async validateRefreshToken(refreshToken) {
        return jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await Token.findOne({user: userId});
        if(tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }

        return await Token.create({
            user: userId,
            refreshToken
        })
    }

    async removeToken(refreshToken) {
        return Token.deleteOne({refreshToken});
    }

    async findToken(refreshToken) {
        return Token.findOne({refreshToken})
    }

}();