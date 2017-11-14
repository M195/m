import { BayesClassifier } from 'natural'
import { createBot, Bot, createM } from '../src'
import { Intent } from '../src/intent'
import { HandlerObject } from '../src/handler'
import { mHandlers } from '../src/m/handlers'
import { mIntents } from '../src/m/intents'

const intents: [Intent] = [
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
  'createBot(): returns a Promise<Bot>',
  async d => {
    const bot = createBot(intents)
    expect(bot).toBeInstanceOf(Promise)
    expect(await bot).toBeInstanceOf(Object)
    d()
  }
)

test(
  'createBot(): returns an object with an ask function that calls generateResponse',
  async d => {
    const bot = await createBot(intents, handlers)
    expect(bot.ask('hello')).toEqual('hello name')
    d()
  }
)

test(
  'createM(): creates a bot using m intents and handlers',
  async d => {
    expect(JSON.stringify(await createM()))
      .toEqual(JSON.stringify(await createBot(mIntents, mHandlers)))
    d()
  }
)