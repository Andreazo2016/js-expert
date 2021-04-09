import readLine from 'readline'
import DraftLog from '../../demo02-esmodule-internalization-parte03/src/node_modules/draftlog'
import Chalk from 'chalk'
import ChalkTable from '../../demo02-esmodule-internalization-parte03/src/node_modules/chalk-table'


import Person from './person.js'


export default class TerminalController {
  constructor() {
    this.print = {}
    this.data = {}
  }

  initializeTerminal(database, language) {
    DraftLog(console).addLineListener(process.stdin)
    this.terminal = readLine.createInterface({
      input: process.stdin,
      output: process.stdout
    })
    this.initializeTable(database, language)
  }

  initializeTable(database, language) {
    const data = database.map(item => new Person(item).formatted(language))
    const table = ChalkTable(this.getTableOptions(), data)
    this.print = console.draft(table)
    this.data = data
  }
  question(msg = '') {
    return new Promise(resolve => this.terminal.question(msg, resolve))
  }

  closeTerminal() {
    this.terminal.close()
  }

  getTableOptions() {
    return {
      leftPad: 2,
      columns: [
        { field: "id", name: Chalk.cyan("ID") },
        { field: "vehicles", name: Chalk.magenta("Vehicles") },
        { field: "kmTraveled", name: Chalk.cyan("Km Traveled") },
        { field: "from", name: Chalk.cyan("From") },
        { field: "to", name: Chalk.cyan("To") },
      ]
    }
  }


  //Método estático, por que eu não estou mexendo com nada da instâcia da classe Person
  static generateInstanceFromString(text) {
    const EMPTY_SPACE = ' '
    const [id, vehicles, kmTraveled, from, to] = text.split(EMPTY_SPACE)
    const person = new Person({
      id,
      kmTraveled,
      from,
      to,
      vehicles: vehicles.split(',')
    })
    return person
  }
}