import * as fs from 'fs'
import * as util from 'util'
import * as path from 'path'

const readFileAsync = util.promisify(fs.readFile)

export interface Intent {
  tag: string
  patterns: [string]
  responses: [string]
}

export const loadIntents = async (path: string): Promise<Array<Intent>> => {
  const intentsFile = JSON.parse(await readFileAsync(path, { encoding: 'utf8' }))
  const intents: Array<Intent> = []

  for (let intent of intentsFile) {
    intents.push(intent)
  }

  return intents
}