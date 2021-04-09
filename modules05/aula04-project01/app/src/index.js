'use strict'
const { readFile } = require('fs/promises')
const { join } = require('path')
const pdfParser = require('pdf-parse')

const TextProcessorFacade = require('./textProcessorFacade')

  ;
(async () => {
  const dataBuffer = await readFile(join(__dirname, '../../../docs/contrato.pdf'))
  const pdf = await pdfParser(dataBuffer)

  const instance = new TextProcessorFacade(pdf.text)
  const people = instance.getPeopleFromPDF()
  console.log(people)
})()