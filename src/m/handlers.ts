import { HandlerObject } from '../handler'

export const mHandlers: HandlerObject = {
  reminder: (text: string, response: string) => ({
    text: `'${text}'`,
  }),
  random: () => ({
    number: Math.floor(Math.random() * 100),
  }),
}