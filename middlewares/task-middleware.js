const ApiError = require("../exceptions/api-error");
const Task = require("../models/Task");

module.exports = async function(req, res, next) {
    try {
        const user = req.user;
        if(!req.params.id && !req.body.id) {
            next(ApiError.BadRequest("Task id is required"));
        }
        const task = await Task.findById(req.params.id || req.body.id);
        if(!task) {
            next(ApiError.notFound("Task not found"));
        }
        if(user.id.toString() !== task.user.toString()) {
            next(ApiError.unAuthorizedError("Invalid task id"));
        }

        next();
    } catch(e) {
        next(e);
    }
}