var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Absence = new Schema ({
    eleve: { type: Schema.Types.ObjectId, ref: "user" },
    classe : { type: Schema.Types.ObjectId, ref: "classe" },
    matiere : { type: Schema.Types.ObjectId, ref: "classe" },
    date : Date,
    type : String
});
module.exports = mongoose.model('Absence', Absence)