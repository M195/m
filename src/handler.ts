import * as fs from 'fs'
import * as util from 'util'
import * as path from 'path'

const readdirAsync = util.promisify(fs.readdir)

export interface Handler {
  (input: string, response: string): object
}

export interface HandlerObject {
  [key: string]: Handler
}

export const handlersFromDir = async (dir: string): Promise<HandlerObject | {}> => {
  const handlers: HandlerObject = {}

  const files = await readdirAsync(dir)

  for (let file of files) {
    const handler = await import(path.resolve(dir, file))
    handlers[file.split('.')[0]] = handler.default
  }

  return handlers
}
