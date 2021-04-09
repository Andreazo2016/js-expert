const { describe, it, before, beforeEach, afterEach } = require('mocha')
const { expect } = require('chai')
const { join } = require('path')
const sinon = require("sinon")
const CarService = require('../../src/services/carService')
const Transanction = require('../../src/entities/transaction')

const carDatabase = join(__dirname, './../../database', 'cars.json')

const mocks = {
  validCar: require('../mocks/valid-car.json'),
  validCarCategory: require('../mocks/valid-carCategory.json'),
  validCustomer: require('../mocks/valid-customer.json'),
}

describe('CarService suite tests', () => {

  let carService = {}
  let sandBox = {}

  before(() => {
    carService = new CarService({
      cars: carDatabase
    })
  })

  beforeEach(() => {
    sandBox = sinon.createSandbox()
  })

  afterEach(() => {
    sandBox.restore()
  })



  it('should retrieve a ramdom position from an array', () => {
    const data = [0, 1, 2, 3, 4]
    const result = carService.getRandomPositionFromArray(data)
    expect(result).to.lte(data.length).and.be.gte(0)
  })

  it('should choose the first id from  carIds in carCategory', () => {

    const carCategory = mocks.validCarCategory

    const carIndex = 0

    sandBox.stub(
      carService,
      carService.getRandomPositionFromArray.name
    )
      .returns(carIndex)



    const result = carService.chooseRamdomCar(carCategory)
    const expected = carCategory.carIds[carIndex]

    expect(result).to.be.equal(expected)
  })

  it('given a carCataegory it should return  an available car', async () => {
    const car = mocks.validCar
    const carCategory = Object.create(mocks.validCarCategory) //cria uma instância imutável
    carCategory.carIds = [car.id]

    sandBox.stub(
      carService.carRepository,
      carService.carRepository.find.name,
    ).resolves(car)

    sandBox.spy(
      carService,
      carService.chooseRamdomCar.name
    )


    const result = await carService.getAvailableCar(carCategory)
    const expected = car
    expect(carService.chooseRamdomCar.calledOnce).to.be.ok
    expect(carService.carRepository.find.calledWithExactly(car.id)).to.be.ok
    expect(result).to.be.deep.equal(expected)
  })


  it('given an carCategory, customer,  and numberOfDays it should calculate  final amount in real', async () => {
    const customer = Object.create(mocks.validCustomer)
    customer.age = 50
    const carCategory = Object.create(mocks.validCarCategory)
    carCategory.price = 37.6

    const numberOfDays = 5

    //Para não depender de dados externos
    sandBox.stub(
      carService,
      'taxesBasedOnAge'
    ).get(() => [{ from: 40, to: 50, then: 1.3 }])

    const expected = carService.currencyFormat.format(244.40)

    const result = carService.calculateFinalPrice(
      customer,
      carCategory,
      numberOfDays
    )

    expect(result).to.be.deep.equal(expected)
  })

  it('given a customer and a car category it should return  a transaction receipt', async () => {
    const car = mocks.validCar
    const carCategory = Object.create(mocks.validCarCategory)
    carCategory.price = {
      ...mocks.validCarCategory,
      price: 37.6,
      carIds: [car.id]
    }

    const customer = Object.create(mocks.validCustomer)
    customer.age = 20

    const numberOfDays = 5
    const dueDate = '10 de novembro de 2020'
    const now = new Date(2020, 10, 5)

    sandBox.useFakeTimers(now.getTime())//garante que a data vai ser sempre 05/11/2020 nos testes


    //moca o retorno do repository para não precisar fazer acesso externo
    sandBox.stub(
      carService.carRepository,
      carService.carRepository.find.name
    ).resolves(car)


    const expectedAmount = carService.currencyFormat.format(206.80)

    const result = await carService.rent(
      customer,
      carCategory,
      numberOfDays
    )

    const expected = new Transanction({
      customer,
      car,
      dueDate,
      amount: expectedAmount
    })

    expect(result).to.be.deep.equal(expected)

  })
})