const TelegramBot = require('node-telegram-bot-api');
const natural = require('natural');
const sentiment = require('sentiment');
const util = require('util');

const config = require('./config');

const intents = require('./intents.json').intents;

const handlers = {
  reminder(text, response) {
    console.log(text);

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
}

const generateResponse = (intents, classifier, text) => {
  const tag = classifier.classify(text);
  const c = classifier.getClassifications(text);
  const sen = sentiment(text);

  const intent = intents[tag];
  
  const response = intent.responses[Math.floor(Math.random() * intent.responses.length)];

  if (handlers[tag]) {
    return handlers[tag].call(null, text, response);  
  }
  return response;
}


// const bot = new TelegramBot(config.token, {
//   // webHook: {
//   //   host: config.host,
//   //   port: config.port,
//   // }
//   polling: true
// });

// bot.setWebHook(config.ngrokHost);
  
const classifier = learnIntents(intents);

// bot.on('message', (msg) => {
//   const response = generateResponse(intents, classifier, msg.text);
//   const chatId = msg.chat.id;

//   bot.sendMessage(chatId, `${response}`);
// });

console.log('bot working');

process.stdin.resume();
process.stdin.setEncoding('utf-8');
process.stdin.on('data', text => {
  input = util.inspect(text);
  const response = generateResponse(intents, classifier, input);

  console.log(response);
});