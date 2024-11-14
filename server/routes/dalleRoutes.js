import express from 'express';
import * as dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const router = express.Router();
const HF_API_URL = "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev";
const HF_API_KEY = process.env.HF_API_KEY;

// POST request to generate image
// router.route('/').post(async (req, res) => {
//   try {
//     const { prompt } = req.body;
//     console.log("Prompt:", prompt);  // Log the prompt for debugging

//     const response = await fetch(HF_API_URL, {
//       method: 'POST',
//       headers: {
//         Authorization: `Bearer ${HF_API_KEY}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ inputs: prompt }),
//     });

//     // Check if the response is successful
//     if (!response.ok) {
//       throw new Error(`Failed to generate image: ${response.status} ${response.statusText}`);
//     }

//     // Check if the response is JSON
//     const contentType = response.headers.get("content-type");
//     if (contentType && contentType.includes("application/json")) {
//       // If the response is JSON, parse it
//       const result = await response.json();
//       console.log("API result:", result);

//       if (result.photo) {
//         return res.status(200).json({ photo: result.photo });
//       } else {
//         return res.status(500).json({ error: 'No image data received from API' });
//       }
//     } else if (contentType && contentType.includes("image")) {
//       // Handle binary data (image) using arrayBuffer() instead of buffer()
//       const imageArrayBuffer = await response.arrayBuffer();
//       console.log("Image received as binary data");
//       return res.status(200).send(Buffer.from(imageArrayBuffer));  // Send the image data directly
//     } else {
//       throw new Error(`Unexpected content type: ${contentType}`);
//     }

//   } catch (error) {
//     console.error('Error:', error);
//     return res.status(500).json({ error: error.message });
//   }
// });

// router.route('/').post(async (req, res) => {
//   try {
//     const { prompt } = req.body;
//     console.log("Prompt:", prompt);

//     const response = await fetch(HF_API_URL, {
//       method: 'POST',
//       headers: {
//         Authorization: `Bearer ${HF_API_KEY}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ inputs: prompt }),
//     });

//     // Check if the response is successful
//     if (!response.ok) {
//       throw new Error(`Failed to generate image: ${response.status} ${response.statusText}`);
//     }

//     // Get content type of the response
//     const contentType = response.headers.get("content-type");

//     if (contentType && contentType.includes("application/json")) {
//       // Handle JSON response
//       const result = await response.json();
//       console.log("API result:", result);

//       if (result.photo) {
//         return res.status(200).json({ photo: result.photo });
//       } else {
//         return res.status(500).json({ error: 'No image data received from API' });
//       }
//     } else if (contentType && contentType.includes("image")) {
//       // Handle image response (binary data)
//       const imageArrayBuffer = await response.arrayBuffer();
//       console.log("Image received as binary data");

//       // Set appropriate content-type for image in the response
//       res.setHeader("Content-Type", contentType);
//       return res.status(200).send(Buffer.from(imageArrayBuffer));  // Send the image directly
//     } else {
//       throw new Error(`Unexpected content type: ${contentType}`);
//     }

//   } catch (error) {
//     console.error('Error:', error);
//     return res.status(500).json({ error: error.message });
//   }
// });

// router.route('/').post(async (req, res) => {
//   try {
//     const { prompt } = req.body;
//     console.log("Prompt:", prompt);  // Log the prompt for debugging

//     const response = await fetch(HF_API_URL, {
//       method: 'POST',
//       headers: {
//         Authorization: `Bearer ${HF_API_KEY}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ inputs: prompt }),
//     });

//     // Check if the response is successful
//     if (!response.ok) {
//       throw new Error(`Failed to generate image: ${response.status} ${response.statusText}`);
//     }

//     const contentType = response.headers.get("content-type");

//     if (contentType && contentType.includes("application/json")) {
//       const result = await response.json();
//       console.log("API result:", result);

//       if (result.photo) {
//         return res.status(200).json({ photo: result.photo });
//       } else {
//         return res.status(500).json({ error: 'No image data received from API' });
//       }
//     } else if (contentType && contentType.includes("image")) {
//       const imageArrayBuffer = await response.arrayBuffer();
//       console.log("Image received as binary data");

//       // Determine image type based on content-type header
//       const imageType = response.headers.get("content-type");

//       // Set appropriate content-type for image in the response
//       res.setHeader("Content-Type", imageType);
//       return res.status(200).send(Buffer.from(imageArrayBuffer));  // Send the image directly
//     } else {
//       throw new Error(`Unexpected content type: ${contentType}`);
//     }

//   } catch (error) {
//     console.error('Error:', error);
//     return res.status(500).json({ error: error.message });
//   }
// });

router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body;
    console.log("Prompt:", prompt);

    const response = await fetch(HF_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${HF_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: prompt }),
    });

    // Check if the response is successful
    if (!response.ok) {
      throw new Error(`Failed to generate image: ${response.status} ${response.statusText}`);
    }

    // Get content type of the response
    const contentType = response.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
      // Handle JSON response
      const result = await response.json();
      console.log("API result:", result);

      if (result.photo) {
        return res.status(200).json({ photo: result.photo });
      } else {
        return res.status(500).json({ error: 'No image data received from API' });
      }
    } else if (contentType && contentType.includes("image")) {
      // Handle image response (binary data)
      const imageArrayBuffer = await response.arrayBuffer();
      console.log("Image received as binary data");

      // Set appropriate content-type for image in the response
      res.setHeader("Content-Type", contentType);
      return res.status(200).send(Buffer.from(imageArrayBuffer));  // Send the image directly
    } else {
      throw new Error(`Unexpected content type: ${contentType}`);
    }

  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: error.message });
  }
});



export default router;
