# fastify-permissions-policy

Set `permissions-policy` headers in Fastify easily. 

See the list here: https://www.w3.org/TR/permissions-policy-1/

Mostly a wrapper around [permissions-policy](https://www.npmjs.com/package/permissions-policy) middleware.

To use:

```js
  import fastify from 'fastify'
  import permissions from 'permissions-policy'

  const fastify = Fastify()
  fastify.register(permissions, {
    features: {
      interestCohort: [],
      fullscreen: ["self"],
      vibrate: ["none"],
      payment: ["self", '"example.com"'],
      syncXhr: [],
    },
  })

  fastify.get('/', (request, reply) => {
    console.log(reply.getHeader('permissions-policy'))
    // interest-cohort=(), fullscreen=(self), vibrate=(none), payment=(self "example.com"), sync-xhr=()
    reply.send({ hello: 'world' })
  })
```