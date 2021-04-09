import mocha from 'mocha'
const { describe, it } = mocha
import chai from 'chai'
const { expect } = chai
import Person from '../src/person.js'


describe("Person", () => {
  it('should return  a person instance from string', () => {
    const person = Person.generateInstanceFromString(
      '1 Bike,Aviao,Navio 2000000 2020-01-12 2021-05-21'
    )

    const expected = {
      from: '2020-01-12',
      to: '2021-05-21',
      kmTraveled: '2000000',
      vehicles: ['Bike', 'Aviao', 'Navio'],
      id: '1'
    }

    expect(person).to.be.deep.equal(expected)

  })

  it('should format values in pt-br', () => {
    const person = new Person({
      from: '2020-01-12',
      to: '2021-05-21',
      kmTraveled: '2000000',
      vehicles: ['Bike', 'Aviao', 'Navio'],
      id: '1'
    })

    const result = person.formatted('pt-BR')

    const expected = {
      id: 1,
      vehicles: 'Bike, Aviao e Navio',
      kmTraveled: '2.000.000 km',
      from: '12 de janeiro de 2020',
      to: '21 de maio de 2021'
    }

    expect(result).to.be.deep.equal(expected)

  })
})