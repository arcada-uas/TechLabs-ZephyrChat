## Local Zephyr API
This is a local implementation of the Zephyr 7B model.
[https://ollama.ai/library/zephyr](https://ollama.ai/library/zephyr)

### Tools and sources
This implementation uses ollama.ai for the deployment of the local implementation.
The source code for ollama can be found here:
[https://github.com/jmorganca/ollama](https://github.com/jmorganca/ollama)

The model used is the Zephyr 7B model, it is an improvement of the Mistral 7B model by Mistral AI
[https://huggingface.co/HuggingFaceH4/zephyr-7b-beta](https://huggingface.co/HuggingFaceH4/zephyr-7b-beta)

### Middleware
The front end consists of the static files index.html and style.css and can in principle be hosted anywhere. Ollama hosts content over http, and even though SSL support has been requested and marked as "enhancement" [https://github.com/jmorganca/ollama/issues/701](https://github.com/jmorganca/ollama/issues/701)
it might take some time until it's implemented. 

The current implementation therefore uses an express server to serve as middleware, accepting https post requests from the front end at the /api/ endpoint and resending them to the ollama http model endpoint. The response is also piped back to the front-end solving the CORS and/or mixed content complaints of the browser.

### Installation
Install Ollama.ai on linux:

``
curl https://ollama.ai/install.sh | sh 
``

### Usage
The ollama library enables us to use it as a CLI

``
ollama run zephyr 
``

Once you run this command ollama also hosts a local API ready to recieve prompts

``` 
curl -X POST http://localhost:11434/api/generate -d '{
  "model": "zephyr",
  "prompt": "Why is the sky blue?"
}'
```
### Front-end
I built a simple front end with a text box and a send button where the reply is printed out underneath the prompt field.

If you want to contribute, please help me improve the front end.
The front end code can be found here:
[https://github.com/arcada-uas/TechLabs-ZephyrChat](https://github.com/arcada-uas/TechLabs-ZephyrChat)



