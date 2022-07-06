const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  email : {
    type : String,
    raquired : true
  },
  lastName: {
    type: String,
    required: true,
  },
  login: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: { type: Schema.Types.ObjectId, ref: "role" },
  phone: {
    type: String, required :true,
  },
  adress : {
    type : String,
    required : true
  },
  image: { type: String, trim: true,},
  
});
module.exports = User = mongoose.model("user", UserSchema);