require("dotenv").config();

const { HfInference } = require("@huggingface/inference");

const HFTOKEN = process.env.HUGGING_FACE_API;

const hf = new HfInference(HFTOKEN);

async function generateImage(caption) {
  try {
    const imageBlob = await hf.textToImage({
      inputs: caption,
      model: "stabilityai/stable-diffusion-2",
    });
    console.log("Image data received");
    const buffer = await imageBlob.arrayBuffer();
    const bufferJSON = Buffer.from(buffer).toJSON(); // I eventually want a JSON as I want to pint this to IPFS
    console.log(bufferJSON)
    return bufferJSON
  } catch (error) {
    console.error(error);
    throw error; // Re-throw the error for handling at a higher level
  }
}

module.exports = generateImage;
