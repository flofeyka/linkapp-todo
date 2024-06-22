const Router = require("express");
const authMiddleware = require("../middlewares/auth-middleware");
const taskController = require("../controllers/task-controller");
const taskMiddleware = require("../middlewares/task-middleware");

const taskRouter = Router();
module.exports = taskRouter;

taskRouter.get("/getById/:id", authMiddleware, taskMiddleware, taskController.getTaskById);
taskRouter.put("/edit/:id", authMiddleware, taskMiddleware, taskController.editTask);
taskRouter.delete("/deleteOne/:id", authMiddleware, taskMiddleware, taskController.deleteTask);
taskRouter.get("/get", authMiddleware, taskController.getTasks);
taskRouter.post("/addOne", authMiddleware, taskController.addTask);