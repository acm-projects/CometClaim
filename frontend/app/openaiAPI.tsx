import axios from 'axios';

const OPENAI_URL = process.env.EXPO_PUBLIC_OPENAI_URL as string;
const OPENAI_API_KEY = process.env.EXPO_PUBLIC_OPENAI_API_KEY as string;

export const fetchAnswerFromOpenAI = async (question: string) => {
  try {
    const response = await axios.post(
      OPENAI_URL,
      {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 
            'You are a helpful FAQ assistant that answers questions university students have with the lost and found system.' },
          { role: 'user', content: question },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${OPENAI_API_KEY}`,

        },
      }
    );

    const answer = response.data.choices[0].message.content.trim();
    return answer;
  } catch (error) {
    console.error('Error recieving answer from openAI:', error);
    return 'Sorry, I am not able to answer that. Please contact lostandfound@utdallas.edu.';
  }
};