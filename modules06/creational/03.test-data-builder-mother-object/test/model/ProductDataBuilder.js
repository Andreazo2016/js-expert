const Product = require("../../src/entities/Product")

class ProductDataBuilder {
  constructor() {
    //default são dados corretos
    // o caso de sucesso
    this.productData = {
      id: '000001',
      name: 'computer',
      price: 1000,
      category: 'electronic'
    }
  }

  withInvalidId() {
    this.productData.id = '1'
    return this
  }

  withInvalidName() {
    this.productData.name = 'abc123'
    return this
  }

  withInvalidPrice() {
    this.productData.price = 2000
    return this
  }
  withInvalidCategory() {
    this.productData.category = 'invalid-category'
    return this
  }

  static aProduct() {
    return new ProductDataBuilder()
  }

  build() {
    const product = new Product(this.productData)
    return product
  }

}

module.exports = ProductDataBuilder