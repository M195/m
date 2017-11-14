import { BayesClassifier } from 'natural'
import { createClassifier, generateResponse } from '../src/classifier'
import { Intent } from '../src/intent'
import { HandlerObject } from '../src/handler'

const intents: [Intent] = [
  {
    tag: 'hello',
    patterns: ['hello'],
    responses: ['hello'],
  },
]

const intentsWithTemplate: [Intent] = [
  {
    tag: 'hello',
    patterns: ['hello'],
    responses: ['hello {{name}}'],
  },
]

const handlers: HandlerObject = {
  hello(input: string, response: string): object {
    return {
      name: 'name',
    }
  }
}

test(
  'createClassifier(): returns a Promise<BayesClassifier>',
  async d => {
    const classifier = createClassifier(intents)
    expect(classifier).toBeInstanceOf(Promise)
    expect(await classifier).toBeInstanceOf(BayesClassifier)
    d()
  }
)

test(
  'createClassifier(): it trains a classifier',
  async d => {
    const classifier = await createClassifier(intents)
    expect(classifier.classify('hello')).toEqual('hello')
    d()
  }
)

test(
  'generateResponse(): classifies input and gives random response',
  async d => {
    const classifier = await createClassifier(intents)
    const response = generateResponse('hello', intents, classifier)
    expect(response).toEqual('hello')
    d()
  }
)

test(
  'generateResponse(): runs supplied handlers to create handlebars template',
  async d => {
    const classifier = await createClassifier(intentsWithTemplate)
    const response = generateResponse('hello', intentsWithTemplate, classifier, handlers)
    expect(response).toEqual('hello name')
    d()
  }
)
