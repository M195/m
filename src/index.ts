import { Intent } from './intent'
import { HandlerObject } from './handler'
import { createClassifier, generateResponse } from './classifier'

import { mIntents } from './m/intents'
import { mHandlers } from './m/handlers'

export interface Bot {
  ask: (text: string) => string
}

export const createBot = async (intents: [Intent], handlers?: HandlerObject): Promise<Bot> => {
  const classifier = await createClassifier(intents)

  return {
    ask: (text: string): string => 
      generateResponse(text, intents, classifier, handlers)
  }
}

export const createM = async (): Promise<Bot> => createBot(mIntents, mHandlers)
