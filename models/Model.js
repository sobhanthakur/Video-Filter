const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    modelwear: {
      type: String,
      enum: ["S", "M", "L", "XL"],
      default: "M",
    },
    height: {
      type: Number,
      required: true,
    },
    bust: {
      type: Number,
      required: true,
    },
    waist: {
      type: Number,
      required: true,
    },
    highhip: {
      type: Number,
      required: true,
    },
    lowhip: {
      type: Number,
      required: true,
    },
    images: [
      {
        url: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = Model = mongoose.model("model", modelSchema);
