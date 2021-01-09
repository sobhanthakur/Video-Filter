const express = require("express");
const router = express.Router();
const filterService = require("../services/Filter");
var multer = require("multer");
var upload = multer({ dest: "./uploads/" });

// @route    POST api/filter
// @desc     Filter Audio
// @access   Public

router.post("/", upload.single("Video"), async (req, res) => {
  const audio = await filterService.VideoToAudio(req, res);
  console.log(audio);
  const text = await filterService.AudioToSpeech(audio);
  return res.status(201).json({ msg: text });
});

module.exports = router;
