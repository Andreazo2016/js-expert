const File = require("./src/file")
const { error } = require("./src/constants")
const { rejects, strictEqual } = require("assert")


const test = async () => {
  {
    const filePath = './mocks/emptyFile-invalid.csv'
    const rejection = new Error(error.FILE_LENGHT_ERROR_MESSAGE)
    const result = File.csvToJson(filePath)
    await rejects(result, rejection)
  }
  {
    const filePath = './mocks/fourItems-invalid.csv'
    const rejection = new Error(error.FILE_LENGHT_ERROR_MESSAGE)
    const result = File.csvToJson(filePath)
    await rejects(result, rejection)
  }
  {
    const filePath = './mocks/threeItems-valid.csv'
    const result = await File.csvToJson(filePath)
    const expected = [
      {
        "id": 123,
        "name": "Erick Wendel",
        "profession": "Javascript Instructor",
        "age": 25
      },
      {
        "id": 321,
        "name": "Xuxa da Silva",
        "profession": "Javascript Specialist",
        "age": 80
      },
      {
        "id": 231,
        "name": "Joaozinho",
        "profession": "Java Developer",
        "age": 30
      }
    ]

    await strictEqual(JSON.stringify(result), JSON.stringify(expected))
  }
}
test()

