module.exports = class TaskDto {
    id;
    name;
    description;
    isDone;
    isChanged;

    constructor(model) {
        this.id = model._id;
        this.name = model.name;
        this.description = model.description;
        this.isDone = model.isDone;
        this.isChanged = model.isChanged;
    }
}