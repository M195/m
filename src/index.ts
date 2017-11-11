import { Intent } from './intent'
import { HandlerObject } from './handler'
import { createClassifier, generateResponse } from './classifier'

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