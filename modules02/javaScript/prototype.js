
/**
 * use sempre "===" ao invés de "==" para comparações, pois o js não conveter implicitamente
 */

//value considered as false in js are undefined,null,NaN,0, ""(empty string) and false




//__proto__ é usado para linkar objetos em js


console.log('----------')
const Animal = {
  name: 'animal',
  isAnimal: true
}


const Dog = {
  canRun: true
}

const Caramelo = {

}

//Linkou os objetos
Dog.__proto__ = Animal
Caramelo.__proto__ = Dog

console.log('Dog.name: ', Dog.name)
console.log('Dog.__proto__:', Dog.__proto__)
console.log('Caramelo.isAnimal: ', Caramelo.isAnimal)
console.log('Caramelo.__proto__ :', Caramelo.__proto__)
console.log('Animal.__proto__: ', Animal.__proto__)


console.log('-----------')

function Humano(name) {
  this.name = name

}

Humano.prototype.showName = () => {
  return this.name + 'Completo'
}


const andreazo = new Humano('andreazo')
console.log(Humano.prototype, andreazo.__proto__)

console.log(andreazo.showName())