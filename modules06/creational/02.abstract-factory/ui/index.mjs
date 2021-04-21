import { database } from '../shared/data.mjs'
import Application from '../app/Application.mjs'

  ;
(async function main() {

  const platform = globalThis.window ? 'browser' : 'console'
  const { default: ViewFactory } = await import(`./../platforms/${platform}/index.mjs`)
  const app = new Application(new ViewFactory())
  app.initialize(database)
})()