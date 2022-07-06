const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RoleSchema = new Schema({
  roleType: {
    type: String, required :true,
  },
});
module.exports = Role = mongoose.model("role", RoleSchema);