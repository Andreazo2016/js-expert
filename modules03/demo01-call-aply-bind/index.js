'use strict'

const { watch, promises: { readFile } } = require('fs')


class File {
  watch(event, filename) {
    this.showContent(filename)
  }

  async showContent(filename) {
    const file = await readFile(filename)
    const content = file.toString()
    console.log(content)
  }
}
// //fica escutando modificação em um arquivo
// watch(__filename, async (event, filename) => {
//   console.log(`${filename} changed`)
// })


const file = new File()

/**
 * Dessa forma , ele ignora o 'this' da classe File
 *  herda o 'this' do watch!
 watch(__filename, file.watch)
 *
 */

/**
 * Alternativa para não herdar o this da funcao
 * mas fica feio
 *
 watch(__filename, (event, filename) => file.watch(event, filename))
 */

/**Jeito sênior: Usando o bind
 * o bind retorna uma função com o 'this' que mantém o contexto do file
 *
 watch(__filename, file.watch.bind(this))
 */

//mudar a implementação de uma função com call e apply (diferença é a passagem de parâmetro, um eu passo um array e outro não)

file.watch.call({ showContent: () => console.log('Hey, this is new call for this function using call method') }, null, __filename)
file.watch.apply({ showContent: () => console.log('Hey, this is new call for this function using applly method') }, [null, __filename])


//Precisei delegar uma função que será executada no futuro: use bind, para mudar o contexto dela