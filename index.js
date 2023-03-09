//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

const { Configuration, OpenAIApi } = require("openai");
const express = require('express')

// add body parser and cors to express 
const bodyParser = require('body-parser')
const cors = require('cors')

const configuration = new Configuration({
    organization: "org-jOduuZmOlhoJTi59WAnrDGGn",
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);
// const response = await openai.listEngines();


//create a simple express api that calls the function above
const app = express();
app.use(bodyParser.json())
app.use(cors())


const port = 3080;
app.post('/', async (req ,res) => {
  const {message, currentModel, currentTemperature} = req.body;
  console.log(message,"message")
    const response = await openai.createCompletion({
        model: currentModel, //"babbage",
        prompt: message,
        max_tokens: 100,
        temperature: currentTemperature,
      });
      
      res.json({
        //  data:response.data,
        message:response.data.choices[0].text,
      })
}
);

app.get('/models', async (req ,res) => {
const response = await openai.listEngines();
console.log(response.data.data)
res.json({
  models: response.data.data
})
});

app.listen(port,()=>{
  console.log(`Example App listening at http://localhost:${port}`)
});