import { describe, test, expect, jest, beforeAll } from '@jest/globals'
import BaseBusiness from '../src/business/base/baseBusiness.js'
import { NotImplementedException } from '../src/util/exceptions.js'

const makeSut = () => {
  class ConcreteClassBusiness extends BaseBusiness { }

  return {
    concreteClassBusiness: new ConcreteClassBusiness()
  }
}

describe('#baseBusiness', () => {

  beforeAll(() => {
    jest.resetAllMocks()
  })
  test('should throw an error when child class does not implement _validateRequiredFields function', () => {
    const { concreteClassBusiness } = makeSut()
    const validationError = new NotImplementedException(
      concreteClassBusiness._validateRequiredFields.name
    )

    expect(() => concreteClassBusiness.create({})).toThrow(validationError)
  })
  test('should throw an error when _validateRequiredFields returns false', () => {
    const { concreteClassBusiness } = makeSut()
    const VALIDATION_DOESNT_SUCCEEDED = false;

    const validationError = new Error('invalid data')
    jest.spyOn(concreteClassBusiness, concreteClassBusiness._validateRequiredFields.name)
      .mockReturnValue(VALIDATION_DOESNT_SUCCEEDED)

    expect(() => concreteClassBusiness.create({})).toThrow(validationError)
  })
  test('should throw an error when child class does not implement _create function', () => {
    const { concreteClassBusiness } = makeSut()
    const VALIDATION_SUCCEEDED = true;

    jest.spyOn(concreteClassBusiness, concreteClassBusiness._validateRequiredFields.name)
      .mockReturnValue(VALIDATION_SUCCEEDED)

    const validationError = new NotImplementedException(
      concreteClassBusiness._create.name
    )

    expect(() => concreteClassBusiness.create({})).toThrow(validationError)
  })
  test('should call _create and _validateRequiredFields on create', () => {
    const { concreteClassBusiness } = makeSut()

    const VALIDATION_SUCCEEDED = true;
    const CREATED_SUCCEEDED = true;

    jest.spyOn(concreteClassBusiness, concreteClassBusiness._validateRequiredFields.name)
      .mockReturnValue(VALIDATION_SUCCEEDED)
    jest.spyOn(concreteClassBusiness, concreteClassBusiness._create.name)
      .mockReturnValue(CREATED_SUCCEEDED)

    const baseClassFn = jest.spyOn(
      BaseBusiness.prototype,
      BaseBusiness.prototype.create.name
    )

    const result = concreteClassBusiness.create({})
    expect(result).toBeTruthy()
    expect(baseClassFn).toHaveBeenCalled()
    expect(concreteClassBusiness._create).toHaveBeenCalled()
    expect(concreteClassBusiness._validateRequiredFields).toHaveBeenCalled()

  })

})
