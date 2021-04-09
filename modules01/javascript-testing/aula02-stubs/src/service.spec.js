const Service = require('./service')
const sinon = require('sinon')
const { deepStrictEqual } = require('assert')
const BASE_URL_01 = 'https://swapi.dev/api/planets/1/'
const BASE_URL_02 = 'https://swapi.dev/api/planets/2/'

const mocks = {
  tatooine: require('./mocks/tatooine.json'),
  alderan: require('./mocks/Alderaan.json'),
}




const run = async () => {
  // {
  //   //vai para internet
  //   const service = new Service()
  //   const withoutStub = await service.makeRequest(BASE_URL_02)
  //   console.log(JSON.stringify(withoutStub))
  // }


  const service = new Service()
  const stub = sinon.stub(service, service.makeRequest.name)

  stub
    .withArgs(BASE_URL_01)
    .resolves(mocks.tatooine)


  stub
    .withArgs(BASE_URL_02)
    .resolves(mocks.alderan)


  {
    const expected = {
      "name": "Tatooine",
      "surfaceWater": "1",
      "appearedIn": 5
    }
    const response = await new Service().getPlanets(BASE_URL_01)
    deepStrictEqual(JSON.stringify(response), JSON.stringify(expected))

  }
  {
    const expected = {
      "name": "Alderaan",
      "surfaceWater": "40",
      "appearedIn": 2
    }
    const response = await new Service().getPlanets(BASE_URL_02)
    deepStrictEqual(JSON.stringify(response), JSON.stringify(expected))

  }
}

run()