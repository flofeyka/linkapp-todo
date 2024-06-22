const User = require("../models/User");
const ApiError = require("../exceptions/api-error");
const Task = require("../models/Task");
const TaskDto = require("../dtos/TaskDto");

module.exports = new class taskService {
    async addTask(userId, name, description) {
        const newTask = await Task.create({
            name, description, user: userId, isDone: false, isChanged: false
        });

        if (!newTask) {
            throw ApiError.BadRequest("Error while task adding")
        }
        const taskDto = new TaskDto(newTask);


        const userUpdated = await User.updateOne({ _id: userId }, {
            $push: { tasks: taskDto.id }
        });

        if (userUpdated.modifiedCount !== 1) {
            await Task.deleteOne({ _id: taskDto.id });
            throw ApiError.BadRequest("Error while task adding")
        }


        return taskDto;
    }

    async deleteTask(userId, id) {
        const taskDeleted = await Task.findByIdAndDelete(id);
        if (!taskDeleted) {
            throw ApiError.BadRequest("Error while task deleting");
        }
        const userUpdated = await User.updateOne({_id: userId}, {
            $pull: {tasks: taskDeleted._id}
        });
        if(userUpdated.modifiedCount !== 1) {
            throw ApiError.BadRequest("Error while task deleting")
        }

        return true;
    }

    async getTaskById(id) {
        const task = await Task.findById(id);
        const taskDto = new TaskDto(task);
        return taskDto;
    }

    async getTasks(userId, isDone) {
        const userFound = await User.findById(userId);
        if(!userFound) {
            throw ApiError.notFound("User is not found");
        }

        return Promise.all(userFound.tasks.map(async function(task) {
            const TaskFound = await Task.findById(task);
            const taskDto = new TaskDto(TaskFound);
            console.log(taskDto);
            if(isDone && taskDto.isDone === isDone) {
                return taskDto;
            }

            return taskDto;
        }));

    }

    async editTask(id, name, description) {
        const taskFound = await Task.findById(id);
        taskFound.isChanged = true;
        if(name) {
            taskFound.name = name;
        }
        if(description) {
            taskFound.description = description;
        }
        return await taskFound.save();
    }

    
}