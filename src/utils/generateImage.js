import { HfInference } from "@huggingface/inference";

const HFTOKEN = import.meta.env.VITE_HUGGING_FACE_API;

const hf = new HfInference(HFTOKEN);

async function generateImage(caption) {
  try {
    const response = await hf.textToImage({
      inputs: caption,
      model: "stabilityai/stable-diffusion-2",
    });
    console.log("Image data received");
    return response; // Resolve with the image data directly
  } catch (error) {
    console.error(error);
    throw error; // Re-throw the error for handling at a higher level
  }
}

export default generateImage;
