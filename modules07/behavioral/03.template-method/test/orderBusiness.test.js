import { describe, test, expect, jest, beforeAll } from '@jest/globals'
import OrderBusiness from '../src/business/base/orderBusiness.js'
import Order from '../src/entities/order.js'



describe('#Test suite for Template Method design pattern', () => {

  beforeAll(() => {
    jest.resetAllMocks()
  })

  describe('#OrderBusiness', () => {
    test('execution Order Business without Template Method', () => {
      const order = new Order({
        customerId: 1,
        amount: 100.000,
        products: [{ description: 'ferrari' }]
      })
      const orderBusiness = new OrderBusiness()
      //ordem obrigatorio que todos os devs devem chamar

      const isValid = orderBusiness._validateRequiredFields(order)
      expect(isValid).toBeTruthy()

      const result = orderBusiness._create(order)
      expect(result).toBeTruthy()
    })


    test('execution Order Business with Template Method', () => {
      const order = new Order({
        customerId: 1,
        amount: 100.000,
        products: [{ description: 'ferrari' }]
      })
      const orderBusiness = new OrderBusiness()

      const calledValidationFn = jest.spyOn(
        orderBusiness,
        orderBusiness._validateRequiredFields.name
      )
      const calledCreateFn = jest.spyOn(
        orderBusiness,
        orderBusiness._create.name
      )
      const result = orderBusiness.create(order)
      expect(result).toBeTruthy()
      expect(calledValidationFn).toHaveBeenCalled()
      expect(calledCreateFn).toHaveBeenCalled()
    })
  })


})
