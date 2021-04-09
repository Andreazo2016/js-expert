const assert = require('assert')

//Generators é usado para retornar mais de um valor sob demanda
//returna valores dentro de array
function* sum(a, b) {
  yield a + b
}

function* main() {
  yield 'helllo'
  yield '-'
  // //só retorna a função para ser chamada depois
  // yield sum(1, 2)
  //executa e depois retorna
  yield* sum(1, 2)
}

const generator = main()
assert.deepStrictEqual(generator.next(), { value: 'helllo', done: false })
assert.deepStrictEqual(generator.next(), { value: '-', done: false })
assert.deepStrictEqual(generator.next(), { value: 3, done: false })


assert.deepStrictEqual(Array.from(main()), ['helllo', '-', 3])
assert.deepStrictEqual([...main()], ['helllo', '-', 3])

//async generators

const { readFile, stat } = require('fs/promises')

async function* promises() {
  const file = await readFile(__filename)
  yield { file: file.toString() }

  const size = await stat(__filename)
  yield { size }
}

;
(async () => {
  for await (const item of promises()) {
    console.log('SystemInfo: ', item)
  }
})()
