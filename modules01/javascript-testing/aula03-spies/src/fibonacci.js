class Fibonacci {

  *execute(input, current = 0, next = 1) {
    if (input === 0) return 0

    //retorn o valor
    yield current

    //delega função para executar
    yield* this.execute(input - 1, next, current + next)
  }

}

module.exports = Fibonacci