const User = require("../models/User");
const ApiError = require("../exceptions/api-error");
const tokenService = require("../services/token-service");
const bcrypt = require("bcrypt");
const UserDto = require("../dtos/UserDto");


module.exports = new class authService {
    async signUp(name, email, password) {
        const userFound = await User.findOne({email});
        if (userFound) {
            throw ApiError.BadRequest("This email already registered")
        }
        const passwordHash = await bcrypt.hash(password, 10);
        const createdUser = await User.create({
            name, email, password: passwordHash
        });
        const userDto = new UserDto(createdUser);

        const {accessToken, refreshToken} = tokenService.generateTokens(userDto);
        await tokenService.saveToken(userDto.id, refreshToken);

        return {
            user: userDto,
            accessToken,
            refreshToken
        }
    }

    async signIn(email, password) {
        const userFound = await User.findOne({email});
        if (!userFound) {
            throw ApiError.unAuthorizedError("Wrong email or password");
        }
        const isCorrectPassword = await bcrypt.compare(password, userFound.password);
        if (!isCorrectPassword) {
            throw ApiError.unAuthorizedError("Wrong email or password");
        }
        const userDto = new UserDto(userFound);
        const {accessToken, refreshToken} = tokenService.generateTokens(userDto);
        await tokenService.saveToken(userDto.id, refreshToken);

        return {
            user: userDto,
            accessToken,
            refreshToken
        }
    }

    async refreshToken(RefreshToken) {
        const tokenFound = await tokenService.findToken(RefreshToken);
        const userData = await tokenService.validateRefreshToken(RefreshToken);
        if (!tokenFound || !userData) {
            throw ApiError.unAuthorizedError("Login time is out");
        }
        const user = await User.findById(userData.payload.id);
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens(userDto);
        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {
            user: userDto,
            ...tokens
        }
    }

    async logout(refreshToken) {
        return await tokenService.removeToken(refreshToken);
    }


}()