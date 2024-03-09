const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
    },
    friends :{
        user: {
            type: Schema.Types.ObjectId,
        },
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("user", UserSchema);