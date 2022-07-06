const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ClasseSchema = new Schema({
  classeName: {
    type: String,
    required: true,
  },
  Prof_matiere: [
    {
      prof: { type: Schema.Types.ObjectId, ref: "user" },
      mat: { type: String, required : true }
    },
  ],
  eleves: [
    {
      eleve: { type: Schema.Types.ObjectId, ref: "user" },
    },
  ],
});
module.exports = Classe = mongoose.model("classe", ClasseSchema);