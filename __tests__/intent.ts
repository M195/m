import * as fs from 'fs'
import * as util from 'util'
import * as path from 'path'
import { loadIntents } from '../src/intent'

const readFileAsync = util.promisify(fs.readFile)

test(
  'loadIntents(): loads intents from a file',
  async d => {
    const intents = [
      {
        "tag": "hello",
        "patterns": ["hello"],
        "responses": ["hello {{name}}"]
      }
    ]
    expect(await loadIntents(path.resolve(__dirname, 'intents/intents.json'))).toEqual(intents)
    d()
  }
)