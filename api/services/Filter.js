var ffmpeg = require('fluent-ffmpeg');
var fs = require('fs');

/*
 * Convert Video to Audio
 */
const VideoToAudio = async (req, res) => {
  console.log(req.file);
    convert(
      req.file.path,
      req.file.destination + "output.flac",
      function (err) {
        if (!err) {
          fs.unlinkSync(req.file.path)
        }
      }
    );
};

/**
 *    input - string, path of input file
 *    output - string, path of output file
 *    callback - function, node-style callback fn (error, result)
 */
function convert(input, output, callback) {
  ffmpeg(input)
    .output(output)
    .on("end", function () {
      console.log("conversion ended");
      callback(null);
    })
    .on("error", function (err) {
      console.log("error: ", e.code, e.msg);
      callback(err);
    })
    .run();
}

module.exports = { VideoToAudio };
