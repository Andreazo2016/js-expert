import BaseBusiness from "./baseBusiness.js";

export default class OrderBusiness extends BaseBusiness {
  #orders = new Set()
  _validateRequiredFields({ customerId, amount, products }) {
    return !!amount && !!products.length
  }

  _create(data) {
    this.#orders.add(data)
    return true
  }
}