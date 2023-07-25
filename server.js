import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import { Configuration, OpenAIApi } from 'openai'

dotenv.config()

console.log(process.env)

const configuration = new Configuration({
  apiKey: process.env.API_TOKEN,
});

const openai = new OpenAIApi(configuration);

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', async (req, res) => {
  res.status(200).send({
    message: 'Hello from snkT!'
  })
})

app.post('/', async (req, res) => {
  try {
    const prompt = req.body.prompt;
    console.log(prompt, " messagesmessages");
    
    
    const response = await openai.createChatCompletion({
      model: "gpt-4",
      messages: `${prompt}`,
      temperature: 0.5,
      max_tokens: 600,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0,
    });
    

    res.status(200).send({
      bot: response.data.choices[0].message
    });

  } catch (error) {
    console.error(error, req.body.prompt)
    res.status(500).send(error || ('Something went wrong',req.body.prompt));
  }
})

app.listen(5000, () => console.log('AI server started on http://localhost:5000'))
