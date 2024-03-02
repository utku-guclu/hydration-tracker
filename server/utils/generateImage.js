require("dotenv").config();

const fs = require("fs").promises;

const API_URL =
  "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0";

const HF = process.env.HUGGING_FACE_API;

const headers = {
  Authorization: `Bearer ${HF}`,
};

async function query(data) {
  const response = await fetch(API_URL, {
    headers,
    method: "POST",
    body: JSON.stringify(data),
  });
  const result = await response.arrayBuffer();
  return result;
}

async function generateImage(caption) {
  try {
    const imageBytes = await query({
      inputs: caption,
    });
    console.log("Image data received");
    return imageBytes;
  } catch (error) {
    console.error(error);
    throw error; // Re-throw the error for handling at a higher level
  }
}

module.exports = generateImage;
