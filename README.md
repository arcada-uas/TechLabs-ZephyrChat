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
**Install Ollama.ai on linux:**

``
curl https://ollama.ai/install.sh | sh 
``

**Install express middleware server**
``
apt install nodejs
npm install express
npm install # inside repo folder where package.json is
node index.js
``

**Fetching SSL Certs**
Config your DNS to point to the server ip
``
apt install certbot
certbot -d yourdomain.com --manual --preferred-challenges dns certonly
``
Deploy the DNS TXT challenge at _acme-challenge.yourdomain.com
Verify the DNS TXT challenge using nslookup before proceeding with certbot
``
nslookup -type=TXT _acme-challenge.yourdomain.com
``
Get your SSL certs by finishing the cerbot setup.
Usually they're stored in /etc/letsencrypt/live/yourdomain.com/
Point your nodejs express middleware server to the certs.
*You will need to deal with groups and read rights, don't rush, RTFM*

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
You can check the ollama docs how to run it as a service:
[https://github.com/jmorganca/ollama/blob/main/docs/faq.md](https://github.com/jmorganca/ollama/blob/main/docs/faq.md)

**To-Do**
[] Reconfigure middleware to start as a service on boot.
[] Write instructions on how to do it in documenation

### Front-end
I built a simple front end with a text box and a send button where the reply is printed out underneath the prompt field.

If you want to contribute, please help me improve the front end.
The front end code can be found here:
[https://github.com/arcada-uas/TechLabs-ZephyrChat](https://github.com/arcada-uas/TechLabs-ZephyrChat)



