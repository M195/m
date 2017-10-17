const { getClassifier, } = require('./learn');
const Handlebars = require('handlebars');
const intents = require('./intents.json').intents;

const handlers = {
  reminder(text) {
    return {
      text: `'${text}'`,
    };
  },
  random() {
    return {
      number: Math.floor(Math.random() * 100),
    };
  },
};

const generateResponse = (text) => getClassifier(__dirname + '/classifier.json').then(classifier => {
  const tag = classifier.classify(text);

  const intent = intents[tag];
  
  const response = intent.responses[Math.floor(Math.random() * intent.responses.length)];

  if (handlers[tag]) {
    const data = handlers[tag].call(null, text, response);
    const template = Handlebars.compile(response);
    return template(data);
  }
  return response;
});

module.exports = { 
  generateResponse,
};
