import http from 'http'
import { InjectHttpInterceptor } from '../src/agent.js'
InjectHttpInterceptor()
function handleRequest(request, response) {
  //response.setHeader('X-Instrumented-By', 'Andreazo Silva')
  response.end('Hello Word')
}

const server = http.createServer(handleRequest)
const port = 3000
server.listen(port, () => console.log('server running at port', port))