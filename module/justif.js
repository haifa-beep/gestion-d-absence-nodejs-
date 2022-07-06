var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Justif = new Schema ({
    eleve: { type: Schema.Types.ObjectId, ref: "user" },
    classe : { type: Schema.Types.ObjectId, ref: "classe" },
    matiere : { type: Schema.Types.ObjectId, ref: "classe" },
    date_examen : String,
    type_examen : String,
    image : String,
    status : Boolean 
});

module.exports = mongoose.model('Justif', Justif)