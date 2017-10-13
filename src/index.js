const { getClassifier, } = require('./learn');
const intents = require('./intents.json').intents;

const handlers = {
  reminder(text, response) {
    return response.replace('{reminder.text}', `'${text}'`);
  },
  random(text, response) {
    return response.replace('${number}', Math.floor(Math.random() * 100));
  },
};

const generateResponse = (text) => getClassifier().then(classifier => {
  const tag = classifier.classify(text);

  const intent = intents[tag];
  
  const response = intent.responses[Math.floor(Math.random() * intent.responses.length)];

  if (handlers[tag]) {
    return handlers[tag].call(null, text, response);  
  }
  return response;
});

module.exports = { 
  generateResponse,
};
