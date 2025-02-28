import axios from 'axios';
import RNFS from 'react-native-fs';

/**
 * Function to analyze nutrition facts from an image
 * @param imageUri - Local file URI of the image
 * @returns Nutrition Facts Label as a string
 */
export const analyzeNutrition = async (imageUri: string): Promise<string> => {
  try {
    if (!imageUri) {
      throw new Error('No image provided.');
    }

    // Convert image to Base64 using react-native-fs
    const imageData = await RNFS.readFile(imageUri, 'base64');

    // Make request to GPT-4 Vision API
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: [
              {
                type: 'text',
                text: 'You are an AI nutrition expert that analyzes food images and provides an estimated Nutrition Facts Label based on the ingredients detected.',
              },
            ],
          },
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: `
                Analyze the following image and provide an estimated Nutrition Facts Label.

                And the answer should have this formatted:
                - Nutrition Facts Label = 
                    - nutrient: Nutrition Name, value: value + unit (e.g., "Nutrient: Calories, Value: 550 kcal") 
                `,
              },
              {
                type: 'image_url',
                image_url: {
                  url: `data:image/jpeg;base64,${imageData}`,
                },
              }, // Send base64 image
            ],
          },
        ],
        max_tokens: 2000, // Adjust token limit for response length
      },
      {
        headers: {
          Authorization: 'Bearer OPENAI_API_KEY',
          'Content-Type': 'application/json',
        },
      },
    );

    // Extract nutrition facts from response
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error analyzing image:', error);
    return 'Failed to analyze image. Please try again.';
  }
};
