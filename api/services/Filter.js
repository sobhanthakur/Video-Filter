var ffmpeg = require("fluent-ffmpeg");
var fs = require("fs");
const speech = require("@google-cloud/speech");

/*
 * Convert Video to Audio
 */
const VideoToAudio = async (req, res) => {
  //   console.log(req.file);
  return new Promise((resolve, reject) => {
    convert(
      req.file.path,
      req.file.destination + "output.flac",
      function (err) {
        if (!err) {
          fs.unlinkSync(req.file.path);
          resolve(req.file.destination + "output.flac");
        } else {
          reject(err);
        }
      }
    );
  });
};

const AudioToSpeech = async (filename) => {
  const client = new speech.SpeechClient();

  const file = fs.readFileSync(filename);
  const audioBytes = file.toString("base64");

  const audio = {
    content: audioBytes,
  };
  const config = {
    encoding: "LINEAR16",
    sampleRateHertz: 16000,
    languageCode: "en-US",
  };

  const request = {
    audio: audio,
    config: config,
  };

  const [response] = await client.recognize(request);

  const transcription = response.results
    .map((result) => result.alternatives[0].transcript)
    .join("\n");
  console.log(`Transcription: ${transcription}`);

  return transcription;
};

/**
 *    input - string, path of input file
 *    output - string, path of output file
 *    callback - function, node-style callback fn (error, result)
 */
const convert = async (input, output, callback) => {
  ffmpeg(input)
    .outputOptions([
      "-f s16le",
      "-acodec pcm_s16le",
      "-vn",
      "-ac 1",
      "-ar 16k",
      "-map_metadata -1",
    ])
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
};

module.exports = { AudioToSpeech, VideoToAudio };
