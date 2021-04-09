const { describe, it, before, beforeEach, afterEach } = require('mocha')
const { expect } = require('chai')
const { join } = require('path')
const sinon = require("sinon")
const CarService = require('../../../aula05-TDD-project-pt01/src/services/carService')

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
})