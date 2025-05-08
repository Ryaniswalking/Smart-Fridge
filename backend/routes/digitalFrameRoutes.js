const express = require("express");
const router = express.Router();
const path = require('path');
const digitalFrameController = require('../controllers/DigitalFrameController');

router.use("/", express.static(path.join(__dirname, '../photos')));

router.get("/list", async (req, res) => {
  try{
    const {vertical, horizontal} = await digitalFrameController.compilePhotos();
    res.json({vertical, horizontal})
  } catch (err){
    console.log("Error from router", err);
    res.status(500).json({error: err})
  }
});

  
module.exports = router;