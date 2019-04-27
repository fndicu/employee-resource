const mongoose = require('mongoose');

const skillSchema = mongoose.Schema({
    communication: Number,
    productKnowledge: Number,
    teamwork: Number,
});

module.exports = mongoose.model("Skill", skillSchema);