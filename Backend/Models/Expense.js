const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
user: {
        type: Schema.Types.ObjectId,
      },
  name: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  amount:{
    type: Number
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