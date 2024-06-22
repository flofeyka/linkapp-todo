const {model, Schema} = require("mongoose");

const taskSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    user: {type: Schema.Types.ObjectId, required: true},
    isDone: {type: Boolean, default: false},
    isChanged: {type: Boolean, default: false}
});

module.exports = model("Task", taskSchema);