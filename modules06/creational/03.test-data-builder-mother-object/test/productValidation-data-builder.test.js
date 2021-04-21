const { describe, it } = require("mocha")
const { expect } = require("chai")
const { productValidator } = require('./../src')
const ProductDataBuilder = require("./model/ProductDataBuilder")

describe('Test Data Builder', () => {
  it('Shouldnt return error with valid product', () => {
    const product = ProductDataBuilder.aProduct().build()
    const result = productValidator(product)

    const expected = {
      erros: [],
      result: true
    }

    expect(expected).to.be.deep.equal(result)
  })

  describe('Product Validation rules', () => {
    it('should return an object error when creating a Product with invalid id', () => {
      const product = ProductDataBuilder.aProduct().withInvalidId().build()
      const result = productValidator(product)

      const expected = {
        erros: [
          'id: invalid length, current [1] expected to be between 2 and 20'
        ],
        result: false
      }

      expect(expected).to.be.deep.equal(result)
    })
    it('should return an object error when creating a Product with invalid name', () => {
      const product = ProductDataBuilder.aProduct().withInvalidName().build()
      const result = productValidator(product)

      const expected = {
        erros: [
          'name: invalid name, current [abc123] expected to have only word'
        ],
        result: false
      }

      expect(expected).to.be.deep.equal(result)
    })
    it('should return an object error when creating a Product with invalid price', () => {
      const product = ProductDataBuilder.aProduct().withInvalidPrice().build()
      const result = productValidator(product)

      const expected = {
        erros: [
          'price: invalid value, current [2000] expected to be between 0 and 1000'
        ],
        result: false
      }

      expect(expected).to.be.deep.equal(result)
    })

    it('should return an object error when creating a Product with invalid category', () => {

      const product = ProductDataBuilder.aProduct().withInvalidCategory().build()
      const result = productValidator(product)

      const expected = {
        erros: [
          'category: invalid value, current [invalid-category] expected to be either eletronic or organic'
        ],
        result: false
      }

      expect(expected).to.be.deep.equal(result)
    })
  })
})