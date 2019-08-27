const app = require('../src/app')

describe('App', () => {
  it('GET / responds with 200 containing "Hello, world!"', () => {
    return supertest(app)
      .get('/soapify/api')
      .expect(200, 'Hello, world!')
  })
})