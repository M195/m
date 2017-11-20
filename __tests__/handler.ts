import * as path from 'path'
import { handlersFromDir } from '../src/handler'

import hello from './handlers/hello'
import world from './handlers/world'

test(
  'handlersFromDir(): import handlers from a dir',
  async d => {
    const handlerObject = await handlersFromDir(path.resolve(__dirname, 'handlers'))
    expect(handlerObject).toEqual({ hello, world })
    d()
  }
)