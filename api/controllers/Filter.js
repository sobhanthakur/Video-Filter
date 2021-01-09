const express = require("express");
const router = express.Router();
const filterService = require("../services/Filter");
var multer  = require('multer');
var upload = multer({ dest: './uploads/' })

// @route    POST api/filter
// @desc     Filter Audio
// @access   Public

router.post(
  "/",
  upload.single('Video'),
  (req, res) => {
    filterService.VideoToAudio(req,res);
    return res.status(201).json({msg:"Coming"});
  }
);

module.exports = router;
