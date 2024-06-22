const Router = require("express");
const authController = require("../controllers/auth-controller");

const authRouter = Router();
module.exports = authRouter;

authRouter.post("/signIn", authController.signIn);
authRouter.post("/signUp", authController.signUp);
authRouter.get("/refresh", authController.refresh);
authRouter.delete("/logout", authController.logout);

