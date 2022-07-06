var Absence = require("../module/absence");
var user = require("../module/user");
var Justif = require("../module/classe");
var express = require("express");
var router = express.Router();
const nodemailer = require("nodemailer");
const { defaultMaxListeners } = require("events");
const { info } = require("console");


//liste des absences 

router.get("/", (req, res) => {
  Justif.find()
    .populate("user", "classe")
    .then((absence) => res.json(absence))
    .catch((err) => console.error(err));
});

// recherche
router.get("/:id", (req, res) => {
  const _id = req.params.id;
  Absence.findOne({ _id })
    .populate("user", "classe")
    .then((absence) => res.send(absence))
    .catch((err) => console.log(err));
});

//Ajouter Absence 
router.post('/add', function(req, res){
    console.log(req.body);
    var absence = new Absence({
    eleve : req.body.id,
    classe : req.body.class,
    matiere : req.body.matiere,
    date : req.body.date,
    type : req.body.type
    });
    absence.save();
});

//update absence
router.post("/updateAction/:id", function (req, res, next) {
    var id = req.body.id;
    absence.findById({ _id: id }, function (err, data) {
      data.eleve = req.body.id;
      data.classe = req.body.class;
      data.matiere = req.body.matiere;
      data.date = req.body.date;
      data.type = req.body.type;
      data.save();
    });
    absence.save();
  });

  // delete absence
router.get("/delete/:id", function (req, res, next) {
    var id = req.params.id;
    absence.findOneAndDelete({ _id: id }, function (err) {
      if (err) throw err;
    });
  });

  router.post("/sendmail", (req, res) => {
    console.log("request came");
    var user = req.body;
    sendMail(user, info => {
      console.log(`the mail has been send ${info.messageId}`);
      res.send(info);
    });

  });
  // async..await is not allowed in global scope, must use a wrapper
async function sendMail(user, callback) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: details.email,
      pass: details.password, 
    }
  });

  // send mail with defined transport object
  if(user.type == "cours"){
  let mailOptions = {
    from: 'school@gmail.com', // sender address
    to: user.email, // list of receivers
    subject: "Absence", // Subject line
    html: `<h1> bonjour, votre enfant ${user.nom} est absent ajourd'hui au cours de ${user.matiere}</h1>`, // html body
  };
  }else {
    let mailOptions = {
      from: 'school@gmail.com', // sender address
      to: user.email, // list of receivers
      subject: "Absence", // Subject line
      html: `<h1> bonjour, votre enfant ${user.nom} est absent ajourd'hui de l'examen de la matiere de ${user.matiere}
      <br> merci de remplir le formulaire du justification 
      <a href="http://localhost:4200/justif/add"></h1>`, // html body
    };
  }
  //send mail witch defined transport object 
  let info = await transporter.sendMail(mailOptions);

  callback(info);

}
module.exports = router ;