

//criar objetos e métodos privatos
//Symbol é utilizado para criar valores únicos na memoria
const keyName = Symbol('name')

const person1 = {}
const person2 = {}
person1['name'] = 'andreazo'
person2[keyName] = 'anderson'

console.log(person2[keyName])
console.log(person1['name'])

//Criar Valor verdadeiramente privados
const keyNamePerson = Symbol('name')
const privateKeyFunction = Symbol('Pfunction')
class Person {
  constructor() {
    this[keyNamePerson] = 'nameDefault'
  }

  [privateKeyFunction]() {
    console.log('Private Function')
  }


}

const p = new Person()

console.log(p[keyNamePerson])
p[privateKeyFunction]()