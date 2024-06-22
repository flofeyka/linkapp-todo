const taskService = require("../services/task-service");

module.exports = new class taskController {
    async getTaskById(req, res, next) {
        try {
            const taskFound = await taskService.getTaskById(req.params.id);
            return res.status(200).json(taskFound);
        } catch(e) {
            next(e);
        }
    }

    async getTasks(req, res, next) {
        try {
            const tasksFound = await taskService.getTasks(req.user.id, req.query.sort);
            return res.status(200).json(tasksFound);
        } catch(e) {
            next(e);
        }
    }

    async addTask(req, res, next) {
        try {
            const {name, description} = req.body;
            const taskAdded = await taskService.addTask(req.user.id, name, description);
            return res.status(200).json(taskAdded)
        } catch(e) {
            next(e);
        }
    }

    async deleteTask(req, res, next) {
        try {
            const taskDeleted = await taskService.deleteTask(req.user.id, req.params.id);
            return res.status(200).json(taskDeleted && "Task successfully deleted");
        } catch(e) {
            next(e);
        }
    }

    async editTask(req, res, next) {
        try {
            const {name, description} = req.body;
            const taskEdited = await taskService.editTask(req.params.id, name, description);
            return res.status(200).json(taskEdited);
        } catch(e) {
            next(e);
        }
    }
}();