import NotImplementedException from "../../shared/NotImplementedException.mjs";
import Chalk from 'chalk'
import ChalkTable from 'chalk-table'

export default class TableConsoleComponent extends NotImplementedException {

  render(data) {
    const columns = this.prepareData(data)
    const options = {
      leftPad: 2,
      columns
    }

    const table = ChalkTable(options, data)
    console.log(table)
  }

  prepareData(data) {
    const [firstItem] = data
    const headers = Object.keys(firstItem)


    const formatHeaders = (data, index) => index % 2 === 0 ? Chalk.yellow(data) : Chalk.green(data)

    const columns = headers
      .map((item, index) => ({
        field: item,
        name: formatHeaders(item, index)
      }))

    return columns
  }
}