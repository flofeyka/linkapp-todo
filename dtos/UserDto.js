module.exports = class UserDto {
    id;
    name;
    email;
    tasks;

    constructor(model) {
        this.id = model.id;
        this.name = model.name;
        this.email = model.email;
        this.tasks = model.tasks
    }
}