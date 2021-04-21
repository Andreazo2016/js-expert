/**
 * ProductID: Should be between 2 and 28 characters
 * Name: Should be only words
 * Price: Should be from zero to thousand
 * Category: Should be electronic or organic
 */

function productValidator(product) {

  const erros = []
  if (!(product.id.length >= 2 && product.id.length <= 20)) {
    erros.push(`id: invalid length, current [${product.id}] expected to be between 2 and 20`)
  }

  const onlyWords = /(\W|\d)/

  if (onlyWords.test(product.name)) {
    erros.push(`name: invalid name, current [${product.name}] expected to have only word`)
  }

  if (!(product.price >= 0 && product.price <= 1000)) {
    erros.push(`price: invalid value, current [${product.price}] expected to be between 0 and 1000`)
  }

  const validCategories = ['electronic', 'organic']

  if (!(validCategories.includes(product.category))) {
    erros.push(`category: invalid value, current [${product.category}] expected to be either eletronic or organic`)
  }

  return {
    result: erros.length === 0,
    erros
  }
}

module.exports = {
  productValidator
}