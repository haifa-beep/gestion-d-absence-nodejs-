const express = require("express");
const router = express.Router();

const Classe = require("../module/classe");

// add Classe
router.post("/", (req, res) => {
  const {classeName, Prof_matiere : [{prof, mat}], eleves : [{eleve}]} = req.body;
  const newClasse = new Classe({classeName, Prof_matiere : [{prof, mat}], eleves : [{eleve}]});

  newClasse
    .save()
    .then((classe) => res.send(classe))
    .catch((err) => console.log(err));
});

// get All classe
router.get("/", (req, res) => {
  Classe.find()
    .then((classe) => res.send(classe))
    .catch((err) => console.log(err));
});

// get Classe by id
router.get("/:_id", (req, res) => {
  const { _id } = req.params;
  Classe.findOne({ _id })
    .then((classe) => res.send(classe))
    .catch((err) => console.log(err));
});

// delete classe
router.delete("/:_id", (req, res) => {
  const { _id } = req.params;
  Classe.findOneAndDelete({ _id: _id })
    .then(() => res.send("success"))
    .catch((err) => console.log(err));
});

router.put("/:_id", (req, res) => {
  const { _id } = req.params;
  const {classeName, Prof_matiere : [{prof, mat}], eleves : [{eleve}]} = req.body;
  Classe.findOneAndUpdate(
    { _id },
    {
      $set: {classeName, Prof_matiere : [{prof, mat}], eleves : [{eleve}]},
    }
  )
    .then(() => res.send("Classe Updated"))
    .catch((err) => console.log(err));
});



  
module.exports = router;