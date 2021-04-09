const { describe, it } = require('mocha')
const request = require('supertest')
const assert = require('assert')
const app = require('./api')

describe('API suit tests', () => {
  describe('/contact', () => {
    it('should request the contact page and return HTTP Status 200', async () => {
      const response = await request(app)
        .get('/contact')
        .expect(200)

      assert.deepStrictEqual(response.text, 'contact us page')

    })
  })
  describe('/hello', () => {
    it('should request an inexistent route /hi and redirect to /hello', async () => {
      const response = await request(app)
        .get('/hi')
        .expect(200)

      assert.deepStrictEqual(response.text, 'hello world')

    })
  })

  describe('/login', () => {
    it('should login successfully on the login route and return HTTP Status 200', async () => {
      const response = await request(app)
        .post('/login')
        .send({ username: 'ErickWendel', password: '123' })
        .expect(200)

      assert.deepStrictEqual(response.text, 'Logging has succeded!')
    })
  })

  describe('/unauthorize', () => {

    it('should unauthorize a request when requesting it using wrong credentials and return HTTP 401', async () => {
      const response = await request(app)
        .post('/login')
        .send({ username: 'Xuxa da silva', password: '321' })
        .expect(401)


      assert.deepStrictEqual(response.text, 'Logging failed!')

    })
  })
})