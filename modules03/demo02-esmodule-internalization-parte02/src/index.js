import Database from '../database.json'
import TerminalController from './terminalController.js'


const DEFAULT_LANG = 'pt-BR'
const CLOSE_TERM = ':q'
const terminalController = new TerminalController()
terminalController.initializeTerminal(Database, DEFAULT_LANG)

async function mainLoop() {
  try {
    const answer = await terminalController.question()
    if (answer === CLOSE_TERM) {
      terminalController.closeTerminal()
      console.log('process finished')
      return;
    }
    const person = TerminalController.generateInstanceFromString(answer)
    console.log('person', person.formatted(DEFAULT_LANG))
    return await mainLoop()
  } catch (error) {
    console.log('Deu Ruim**', error)
    return await mainLoop()
  }
}
await mainLoop()