import Fastify from 'fastify'
import permissions from '../src/index'

describe('Testing headers', () => {
  test('throws', () => {
    const fastify = Fastify()

    try {
      fastify.register(permissions, {
        features: {},
      })
    } catch (ex) {
      expect(ex.message).toBe('At least one feature is required.')
    }
  })
  test('sets sinlge and empty headers', (done) => {
    const fastify = Fastify()

    fastify.register(permissions, {
      features: {
        interestCohort: [],
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
        interestCohort: [],
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
