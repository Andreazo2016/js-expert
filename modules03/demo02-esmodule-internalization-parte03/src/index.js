import Database from '../database.json'
import Person from '../src/person.js'
import TerminalController from './terminalController.js'
import { save } from './repository.js'


//Português Brasil
//const DEFAULT_LANG = 'pt-BR'
//Espanhol 
// const DEFAULT_LANG = 'es'
//Inglês
const DEFAULT_LANG = 'en-us'
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

    const person = Person.generateInstanceFromString(answer)

    terminalController.updateTable(person.formatted(DEFAULT_LANG))

    await save(person)
    return await mainLoop()

  } catch (error) {
    console.log('Deu Ruim**', error)
    return await mainLoop()
  }
}
await mainLoop()