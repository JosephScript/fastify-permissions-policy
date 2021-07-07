import Fastify from 'fastify'
import permissions from '../src/index'

describe('Testing headers', () => {
  test('sets sinlge and empty headers', (done) => {
    const fastify = Fastify()

    fastify.register(permissions, {
      features: {
        'interest-cohort': [],
      },
    })
    fastify.get('/', (request, reply) => {
      reply.send({ hello: 'world' })
    })

    fastify.inject(
      {
        method: 'GET',
        url: '/',
      },
      (err, res) => {
        expect(err).toBe(null)
        const expected = 'interest-cohort=()'

        expect(res.headers['permissions-policy']).toBe(expected)
        done()
      },
    )
  })
  test('sets non-empty and multiple headers', (done) => {
    const fastify = Fastify()

    fastify.register(permissions, {
      features: {
        'interest-cohort': [],
        fullscreen: ['self'],
        vibrate: ['none'],
        payment: ['self', '"example.com"'],
        syncXhr: [],
      },
    })
    fastify.get('/', (request, reply) => {
      reply.send({ hello: 'world' })
    })

    fastify.inject(
      {
        method: 'GET',
        url: '/',
      },
      (err, res) => {
        expect(err).toBe(null)
        const expected =
          'interest-cohort=(), fullscreen=(self), vibrate=(none), payment=(self "example.com"), sync-xhr=()'

        expect(res.headers['permissions-policy']).toBe(expected)
        done()
      },
    )
  })
})
