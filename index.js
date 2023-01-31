const OpenAI = require("openai");
const { Configuration, OpenAIApi } = OpenAI;

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3001;

const configuration = new Configuration({
  organization: "org-GIzXGAafdeIoVjNbNvfiCf1L",
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

app.use(bodyParser.json());
app.use(cors());

app.post("/", async (req, res) => {

    const { message } = req.body;

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `Convert movie titles into emoji
    ${message}`,
    max_tokens: 100,
    temperature: 0,
  });
  console.log(response.data)
  if (response.data.choices[0].text) {
    res.json({ message: response.data.choices[0].text });
      }
  });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
