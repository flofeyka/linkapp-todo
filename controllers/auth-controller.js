const authService = require("../services/auth-service");

module.exports = new class authController {
    async signIn(req, res, next) {
        try {
            const {email, password} = req.body;
            const userData = await authService.signIn(email, password);
            res.cookie("refreshToken", userData.refreshToken, {
                maxAge: 7 * 24 * 60 * 60 * 1000,
                httpOnly: true
            })
            return res.json(userData);
        } catch(e) {
            next(e);
        }
    }

    async signUp(req, res, next) {
        try {
            const {name, email, password} = req.body;
            const userData = await authService.signUp(name, email, password);
            res.cookie("refreshToken", userData.refreshToken, {
                maxAge: 7 * 24 * 60 * 60 * 1000,
                httpOnly: true
            });
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async refresh(req, res, next) {
        try {
            const userData = await authService.refreshToken(req.cookies.refreshToken);
            res.cookie("refreshToken", userData.refreshToken, {
                maxAge: 7 * 24 * 60 * 60 * 1000,
                httpOnly: true
            });
            return res.json(userData);
        } catch(e) {
            next(e);
        }
    }

    async logout(req, res, next) {
        try {
            const isLogoutSuccessful = await authService.logout(req.cookies.refreshToken);
            res.clearCookie("refreshToken");
            return res.status(isLogoutSuccessful ? 200 : 400).json(isLogoutSuccessful && "Logout successful")
        } catch(e) {
            next(e);
        }
    }


}();