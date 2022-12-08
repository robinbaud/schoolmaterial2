const express = require("express");
const app = express();
const axios = require("axios");
const http = require("http");
var bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Materiel = require("./models/Materiel");
var jsonParser = bodyParser.json();
require("dotenv").config();

var mongodb = require("mongodb");

const nodemailer = require("nodemailer");

app.use(express.json());
const db = mongoose.connection;

mongoose
  .connect(
    "mongodb+srv://robin:robin@schoolmaterialcluster.xhun1xs.mongodb.net/schoolmaterialdb?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch((err) => console.log(err));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.get("/api/students", function (req, res) {
  axios
    .get("http://vps-a47222b1.vps.ovh.net:4242/Student")
    .then((r) => res.json(r.data))
    .catch((e) => res.json(e));
});
app.get("/api/allMateriels", function (req, res) {
  Materiel.find()
    .then((materiels) => res.status(200).json(materiels))
    .catch((error) => res.status(400).json({ error }));
});

app.post("/api/addMateriel", jsonParser, function (req, res) {
  console.log(req.body);
  const materiel = new Materiel({
    ...req.body,
    // pour tester si la route post fonctionne
    // name: 'name test',
    // description: 'description test'
  });
  materiel
    .save()
    .then(() => res.status(201).json({ message: "Matériel enregistré !" }))
    .catch((error) => res.status(400).json({ error }));
});

module.exports = app;
