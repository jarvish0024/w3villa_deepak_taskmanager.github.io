const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    name: { type: String, required: true },
    status: { type: String, required: true },
    description: { type: String, required: true },
}, { timestamps: true});

const Task = mongoose.model('Task', TaskSchema);
module.exports = Task;