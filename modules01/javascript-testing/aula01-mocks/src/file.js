const { readFile } = require('fs/promises')
const { parseUser } = require('./parse')
const { error } = require('./constants')

const DEFAULT_OPTIONS = {
  maxLines: 3,
  fields: ['id', 'name', 'profession', 'age']
}


class File {

  static async csvToJson(filePath) {

    const contentFile = await File.getFileContent(filePath)
    const validation = File.isValid(contentFile)
    if (!validation.valid) throw new Error(validation.error)
    const users = File.parseCSVToJSON(contentFile)
    return users
  }

  static async getFileContent(filePath) {
    const file = await readFile(filePath)
    const normalizeFile = file.toString('utf-8')
    return normalizeFile
  }

  static isValid(csvString, options = DEFAULT_OPTIONS) {
    const [header, ...fileWithoutHeader] = csvString.split('\n')
    const isHeaderValid = header === options.fields.join(',')

    if (!isHeaderValid) {
      return {
        error: error.FILE_FIELDS_ERROR_MESSAGE,
        valid: false
      }
    }

    const isContentLenghtAccepted = (
      fileWithoutHeader.length > 0 &&
      fileWithoutHeader.length <= options.maxLines
    )

    if (!isContentLenghtAccepted) {
      return {
        error: error.FILE_LENGHT_ERROR_MESSAGE,
        valid: false
      }
    }
    return {
      valid: true
    }
  }

  static parseCSVToJSON(csvString) {
    const lines = csvString.split('\n')

    //remove a primeira item do array 
    const firstLine = lines.shift()
    const header = firstLine.split(',')
    const users = lines.map(line => {

      //['id', 'name', 'profession', 'age']
      const columns = line.split(',')

      let user = {}

      for (let index in columns) {
        /**
         * ['id', 'name', 'profession', 'age']
         * index = 0, 
         * 231,Joaozinho,Java Developer,30
         */
        user[header[index]] = columns[index]
      }

      return parseUser(user)
    })
    return users
  }
}

module.exports = File