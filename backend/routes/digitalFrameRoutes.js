const express = require("express");
const router = express.Router();
const path = require('path')
const fs = require("fs");

const photosPath = path.join(__dirname, '../photos');

router.use("/", express.static(path.join(__dirname, '../photos')));

router.get("/list", (req, res) => {
  fs.readdir(photosPath, (err, files) => {
    if(err) return res.status(500).json.json({error: "Failed to read photos directory."})
    
    const imageFiles = files.filter(file =>
      /\.(jpg|jpeg|png|gif)$/i.test(file)
    )
    res.json(imageFiles)
  })
})

module.exports = router;