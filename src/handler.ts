export interface Handler {
  (input: string, response: string): object
}

export interface HandlerObject {
  [key: string]: Handler
}