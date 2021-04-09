const faker = require('faker')
const { join } = require('path')
const Car = require('../src/entities/car')
const Customer = require('../src/entities/customer')
const CarCategory = require('../src/entities/carCategory')

const { writeFile } = require('fs/promises')
const { writer } = require('repl')

const AMOUNT_ITEMS = 2
const seedBaseFoulder = join(__dirname, '../', 'database')


const carCategory = new CarCategory({
  id: faker.datatype.uuid(),
  name: faker.vehicle.type(),
  carIds: [],
  price: faker.finance.amount(20, 100)
})

const cars = []
const customers = []

for (let i = 0; i <= AMOUNT_ITEMS; i++) {
  const car = new Car({
    id: faker.datatype.uuid(),
    name: faker.vehicle.model(),
    available: true,
    gasAvailable: true,
    releaseYear: faker.date.past().getFullYear()
  })

  const customer = new Customer({
    id: faker.datatype.uuid(),
    name: faker.name.firstName(),
    age: faker.random.number({ min: 18, max: 50 })
  })

  carCategory.carIds.push(car.id)
  cars.push(car)
  customers.push(customer)
}


const write = (filename, data) => writeFile(join(seedBaseFoulder, filename), JSON.stringify(data))

  ;
(async () => {
  await write('customers.json', customers)
  await write('cars.json', cars)
  await write('carCategory.json', [carCategory])
  console.log(cars)
  console.log(carCategory)



})()