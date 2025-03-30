//Should have secret key correctly?
import axios from "axios";
//Figure out why React Native is so mean ;-;
//import { OPENAI_API_KEY } from '@env';
//import { OPENAI_API_KEY } from 'react-native-dotenv';
const API_URL = process.env.EXPO_PUBLIC_OPENAI_API_URL;
const OPENAI_API_KEY = process.env.EXPO_PUBLIC_OPENAI_API_KEY;
const fetchAnswerFromOpenAI = async (question: string) => {
  if (API_URL != null && OPENAI_API_KEY != null) {
    try {
      const response = await axios.post(
        API_URL,
        {
          model: "gpt-3.5-turbo", //or gpt-4?
          messages: [
            {
              role: "system",
              content:
                "You are a helpful FAQ assistant that answers questions university students have with the lost and found system.",
            },
            { role: "user", content: question },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${OPENAI_API_KEY}`,
          },
        }
      );
      const answer = response.data.choices[0].message.content.trim();
      return answer;
    } catch (error) {
      console.error("Error recieving answer from openAI:", error);
      return "Sorry, I do not understand that. :(";
    }
  } else {
    console.log("No API URL and OPEN AI API Key provided");
  }
};
export default fetchAnswerFromOpenAI;
