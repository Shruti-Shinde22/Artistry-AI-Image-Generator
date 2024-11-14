//openai api
// import express from 'express';
// import * as dotenv from 'dotenv';
// import { Configuration, OpenAIApi } from 'openai';

// dotenv.config();

// const router = express.Router();

// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// const openai = new OpenAIApi(configuration);

// // Basic route to check if the API is working
// router.route('/').get((req, res) => {
//   res.status(200).json({ message: 'Hello from DALL-E!' });
// });

// // POST route to generate image based on a prompt
// router.route('/').post(async (req, res) => {
//   try {
//     const { prompt } = req.body;

//     // Call OpenAI's DALL-E model to create an image
//     const aiResponse = await openai.createImage({
//       prompt, // User-provided prompt
//       n: 1, // Number of images to generate
//       size: '1024x1024', // Image size
//       response_format: 'b64_json', // Return image as base64 encoded JSON
//     });

//     // Extract the base64 image data from the response
//     const image = aiResponse.data.data[0].b64_json;

//     // Send the base64 image data back to the frontend
//     res.status(200).json({ photo: image });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send(error?.response?.data?.error?.message || 'Something went wrong');
//   }
// });

// export default router;

//hugging fac api
import express from 'express';
import * as dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const router = express.Router();

// Hugging Face API endpoint for Stable Diffusion or other image generation models
const HUGGING_FACE_API_URL = 'https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2';

// Basic route to check if the API is working
router.route('/').get((req, res) => {
  res.status(200).json({ message: 'Hello from Hugging Face API!' });
});

// POST route to generate image based on a prompt
router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body;

    // Call Hugging Face's Stable Diffusion model to create an image
    const response = await axios.post(
      HUGGING_FACE_API_URL,
      { inputs: prompt },
      {
        headers: {
          'Authorization': `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
        },
      }
    );

    // The Hugging Face response will contain a URL to the generated image
    const imageUrl = response.data[0].generated_image;

    // Send the image URL back to the frontend
    res.status(200).json({ photo: imageUrl });
  } catch (error) {
    console.error(error);
    res.status(500).send(error?.response?.data?.error?.message || 'Something went wrong');
  }
});

export default router;
