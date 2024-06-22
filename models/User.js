const {model, Schema} = require("mongoose");

const UserSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    tasks: {type: Array, ref: "Task"}
});

module.exports = model("User", UserSchema);