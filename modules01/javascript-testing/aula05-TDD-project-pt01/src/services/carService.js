const BaseRepository = require("../repository/base/baseRepository")

class CarService {
  constructor({ cars }) {
    this.carRepository = new BaseRepository({ file: cars })
    this.currencyFormat = new Intl.NumberFormat('pt-br', {
      style: 'currency',
      currency: 'BRL'
    })
  }

  getRandomPositionFromArray(list) {
    const listLength = list.length
    return Math.floor(
      Math.random() * (listLength) //vai pegar um número que seja menor que o tamanho da lista
    )
  }

  chooseRamdomCar(carCategory) {
    const randomCarIndex = this.getRandomPositionFromArray(carCategory.carIds)
    const carId = carCategory.carIds[randomCarIndex]
    return carId
  }
  async getAvailableCar(carCategory) {
    const carId = this.chooseRamdomCar(carCategory)
    const car = await this.carRepository.find(carId)
    return car
  }


}

module.exports = CarService