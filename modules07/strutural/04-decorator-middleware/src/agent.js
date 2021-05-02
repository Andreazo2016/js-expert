import Http from 'http'

async function InjectHttpInterceptor() {
  const oldEmitRef = Http.Server.prototype.emit

  Http.Server.prototype.emit = function (...args) {
    const [type, req, response] = args
    if (type === 'request') {
      response.setHeader('X-Instrumented-By', 'Andreazo Silva')
    }
    return oldEmitRef.apply(this, args)
  }

}

export {
  InjectHttpInterceptor
}