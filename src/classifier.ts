import { Intent } from './intent'
import { HandlerObject } from './handler'
import { BayesClassifier } from 'natural'
import { compile } from 'handlebars'

export const createClassifier = (intents: [Intent]): Promise<BayesClassifier> => new Promise((resolve, reject) => {
  const classifier = new BayesClassifier()
  
  intents.forEach(intent => {
    intent.patterns.forEach(pattern => classifier.addDocument(pattern, intent.tag))
  })

  classifier.events.on('doneTraining', () => resolve(classifier))
  classifier.events.on('doneTrainingError', reject)

  classifier.train()
})

export const generateResponse = (text: string, intents: [Intent], classifier: BayesClassifier, handlers?: HandlerObject): string => {
  const tag = classifier.classify(text)
  const intent = intents.filter(i => i.tag === tag)[0]
  const response = intent.responses[Math.floor(Math.random() * intent.responses.length)]

  if (handlers && handlers[tag]) {
    const data = handlers[tag].call(null, text, response)
    return compile(response)(data)
  }
  return response
}