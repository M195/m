const fs = require('fs');

const { learn, getClassifier, } = require('../src/learn');
const intentsFile = require('../src/intents.json').intents;

const natural = require('natural');

const intents = {
  hello: {
    tag: 'hello',
    patterns: [
      'hello!',
    ],
    responses: [
      'hi!',
    ],
  },
};

const classifierFile = __dirname + '/classifier.json';

test('learn: creates a classifier based on an intents object', () => {
  const classifier = learn(intents, classifierFile);

  expect(classifier).toBeInstanceOf(natural.BayesClassifier);
});

test('learn: it saves the classifier into a json file after learning', () => {
  natural.BayesClassifier.load(classifierFile, null, (err, classifier) => {
    expect(classifier).toBeInstanceOf(natural.BayesClassifier);
    expect(err).toEqual(null);
  });
});

test('getClassifier: loads classifier from a file if it exists', (d) => {
  getClassifier(classifierFile)
    .then(c => {
      expect(c).toBeInstanceOf(natural.BayesClassifier);
      d();
    });
});

test('getClassifier: creates a new classifier from intents.json file if file doesn\'t exists', (d) => {
  getClassifier(__dirname + '/notafile.json')
    .then(c => {
      expect(c).toEqual(learn(intentsFile, __dirname + '/notafile.json'));
      d();
    });
});

afterAll(() => {
  fs.unlinkSync(classifierFile);
  fs.unlinkSync(__dirname + '/notafile.json');
});
