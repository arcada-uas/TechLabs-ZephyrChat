## Local Zephyr API
This is a local implementation of the Zephyr 7B model.
[https://ollama.ai/library/zephyr](https://ollama.ai/library/zephyr)

### Tools and sources
This implementation uses ollama.ai for the deployment of the local implementation.
The source code for ollama can be found here:
[https://github.com/jmorganca/ollama](https://github.com/jmorganca/ollama)

The model used is the Zephyr 7B model, it is an improvement of the Mistral 7B model by Mistral AI
[https://huggingface.co/HuggingFaceH4/zephyr-7b-beta](https://huggingface.co/HuggingFaceH4/zephyr-7b-beta)


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



