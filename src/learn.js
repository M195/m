const natural = require('natural');
const intents = require('./intents.json').intents;

const learn = (intents, filename) => {
  const classifier = new natural.BayesClassifier();

  for (var tag in intents) {
    if (!intents.hasOwnProperty(tag)) continue;

    const intent = intents[tag];
    intent.patterns.forEach(pattern => classifier.addDocument(pattern, tag));
  }

  classifier.train();
  
  classifier.save(filename, () => {});

  return classifier;
};

const getClassifier = (filename) => new Promise((resolve) => {
  natural.BayesClassifier.load(filename, null, (err, classifier) => {
    if (err) {
      resolve(learn(intents, filename));
    }
    resolve(classifier);
  });
});

module.exports = {
  learn,
  getClassifier,
};