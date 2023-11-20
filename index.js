const { OPENAI_API_KEY } = require('./apikey.js');
const OpenAI = require("openai");
const openai = new OpenAI({ apiKey: OPENAI_API_KEY });
const express = require("express");
const https = require("https");
const fs = require("fs");
const path = require("path");
const { resolve } = require("dns");

const app = express();
const port = 443;
app.use(express.static('public')) // For serving static files from public folder.
app.use(express.json()); // For parsing application/json


// ##################################################
// ######### ZEPHYR FUNCTIONALITY START ###############

app.post("/api/", async (req, res) => {
  // Send message to Model API
  const response = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ "model": "zephyr", "prompt": req.body.question })
  });
  // Return stream of Uint8Array
  for await (const chunk of response.body) {
    res.write(chunk); // took me ages to find this oh so obvious method!
  }
});

// ######### ZEPHYR FUNCTIONALITY END ###############
// ##################################################
// ######### OPENAI COMPLETION START ################
// Fetch the completion
app.post("/openai/", async (req, res) => {
  const completion = await openai.chat.completions.create({
    messages: [{
      role: "system",
      content: "You are a helpful assistant"
      // content: "You are a helpful assistant designed to output JSON."
    }, {
      // role: "user", content: req.body.question
      role: "user", content: req.body.question,
    }],
    model: "gpt-3.5-turbo-1106",
    stream: true    // Remove stream true to not have to deal with chunks on server side.
    //response_format: { type: "json_object" } // Might be useful for api to api communcation
  });
  // Return stream of text
  res.set('Content-Type', 'text/plain');
  for await (const chunk of completion) {
    if (chunk.choices[0].delta.content !== undefined) {
      // console.log(chunk.choices[0]); // Server debug
      res.write(chunk.choices[0].delta.content); // For non streamed reply
    }
  };
});
// ##################################################
// ######### OPENAI COMPLETION END ################

// Read SSL certificate and key files
const options = {
  // Replace these with location of servers certificates
  key: fs.readFileSync("./privkey.pem"),
  cert: fs.readFileSync("./fullchain.pem"),
};

// Create HTTPS server
const server = https.createServer(options, app);

server.listen(port, () => {
  console.log(`App listening on https://localhost:${port}`);
});
