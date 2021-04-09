import DraftLog from '../../demo02-esmodule-internalization-parte02/src/node_modules/draftlog'
import Chalk from 'chalk'
import ChalkTable from '../../demo02-esmodule-internalization-parte02/src/node_modules/chalk-table'
import Database from '../database.json'
import readLine from 'readline'
import Person from './person.js'

const DEFAULT_LANG = 'pt-BR'

DraftLog(console).addLineListener(process.stdin)

const options = {
  leftPad: 2,
  columns: [
    { field: "id", name: Chalk.cyan("ID") },
    { field: "vehicles", name: Chalk.magenta("Vehicles") },
    { field: "kmTraveled", name: Chalk.cyan("Km Traveled") },
    { field: "from", name: Chalk.cyan("From") },
    { field: "to", name: Chalk.cyan("To") },
  ]
}

const table = ChalkTable(options, Database.map(item => new Person(item).formatted(DEFAULT_LANG)))
const print = console.draft(table)



