import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    organization: process.env.OPENAI_ORG,
    apiKey: process.env.OPENAI_KEY,
});

const openai = new OpenAIApi(configuration);

const systemRole = "As a highly skilled AI language model, I am tasked with creating engaging and informative social media posts for a breakthrough product: a healthy pizza that makes you healthier the more you eat it. The pizza's dough contains stardust, the tomato sauce is made with a pinch of moonstone, and the mozzarella is gathered on the Sun. Generate a captivating social media post that highlights the unique and healthy aspects of this pizza, while encouraging people to try it out. I like to add emojis and hashtags to my posts."

export default defineEventHandler(async event => {
    const payload = await readBody(event);

    const userPrompt = payload.description;

    if (!userPrompt) {
        return {
            statusCode: 400,
            body: 'Missing message'
        }
    }

    try {
        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                {"role": "system", "content": `${systemRole}.`},
                {"role": "user", "content": `${userPrompt}.`}
            ],
            n: 1,
        });
  
        const result = response.data.choices[0].message;
        return { message: result?.content }
      } catch (error) {
          console.error('Error during ChatCompletion:', error);
            throw createError({
                statusCode: 500,
                message: 'An error occurred while processing your request'
            })
      }
    
});