var Justif = require("../module/justif");
var Justif = require("../module/classe");
var Justif = require("../module/user");
var express = require("express");
var router = express.Router();
const uploadMulter = require("../uploads/images");


//liste des justifs 

router.get("/", (req, res) => {
  Justif.find()
    .populate("user", "classe")
    .then((justif) => res.json(justif))
    .catch((err) => console.error(err));
});

// recherche
router.get("/:id", (req, res) => {
  const _id = req.params.id;
  Justif.findOne({ _id })
    .populate("user", "classe")
    .then((justif) => res.send(justif))
    .catch((err) => console.log(err));
});

//Ajouter justification 
router.post('/add', uploadMulter, function(req, res){
    console.log(req.body);
    var justif = new Justif({
    eleve : req.body.id,
    classe : req.body.class,
    matiere : req.body.matiere,
    date_examen : req.body.date,
    type_examen : req.body.type,
    image : req.file.path
    });
    
    justif.save();
});

//update justification
router.post("/updateAction/:id", function (req, res, next) {
    var id = req.body.id;
    justif.findById({ _id: id }, function (err, data) {
        data.eleve = req.body.id;
        data.classe = req.body.class;
        data.matiere = req.body.matiere;
        data.date_examen = req.body.date;
        data.type_examen = req.body.type;
      data.save();
    });
    justif.save();
  });

  //update justification accepter ou refusee
router.post("/updateAccept/:id", function (req, res, next) {
  var id = req.body.id;
  justif.findById({ _id: id }, function (err, data) {
      data.status = req.body.status;
    data.save();
  });
  justif.save();
});

  router.put("/updateimage/:id", uploadMulter, (req, res) => {
    const _id = req.params.id;
    let image = req.file.path;
  
    User.findOneAndUpdate(
      { _id },
      {
        $set: {
          image,
        },
      }
    )
      .then(() => res.send("user image updated"))
      .catch((err) => console.log(err));
  });

  // delete justif
router.get("/delete/:id", function (req, res, next) {
    var id = req.params.id;
    justif.findOneAndDelete({ _id: id }, function (err) {
      if (err) throw err;
    });
  });

module.exports = router ;