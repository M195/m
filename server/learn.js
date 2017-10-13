const natural = require('natural');
const intents = require('./intents.json').intents;

const learn = (intents) => {
  const classifier = new natural.BayesClassifier();

  for (var tag in intents) {
    if (!intents.hasOwnProperty(tag)) continue;

    const intent = intents[tag];
    intent.patterns.forEach(pattern => classifier.addDocument(pattern, tag));
  }

  classifier.train();
  
  classifier.save(__dirname + '/classifier.json', () => {});

  return classifier;
};

const getClassifier = () => new Promise((resolve) => {
  natural.BayesClassifier.load(__dirname + '/classifier.json', null, (err, classifier) => {
    if (err) {
      resolve(learn(intents));
    }
    resolve(classifier);
  });
});

module.exports = {
  learn,
  getClassifier,
};