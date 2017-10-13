const natural = require('natural');

const intents = require('./intents.json').intents;

const handlers = {
  reminder(text, response) {
    return response.replace('{reminder.text}', `'${text}'`);
  },
  random(text, response) {
    return response.replace('${number}', Math.floor(Math.random() * 100));
  },
};

const learnIntents = (intents) => {
  const classifier = new natural.BayesClassifier();

  for (var tag in intents) {
    if (!intents.hasOwnProperty(tag)) continue;

    const intent = intents[tag];
    intent.patterns.forEach(pattern => classifier.addDocument(pattern, tag));
  }

  classifier.train();
  return classifier;
};

const classifier = learnIntents(intents);

const generateResponse = (text) => {
  const tag = classifier.classify(text);

  const intent = intents[tag];
  
  const response = intent.responses[Math.floor(Math.random() * intent.responses.length)];

  if (handlers[tag]) {
    return handlers[tag].call(null, text, response);  
  }
  return response;
};

module.exports = { 
  generateResponse,
};
