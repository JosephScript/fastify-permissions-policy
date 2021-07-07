import fp from 'fastify-plugin'
import { FastifyInstance } from 'fastify'
import permissionsPolicy from 'permissions-policy'

export interface PermissionsPolicyOptions {
  features: Record<string, string[]>
}

export default fp(
  function (
    fastify: FastifyInstance,
    options: Readonly<PermissionsPolicyOptions>,
    next: (error?: Error) => void,
  ) {
    const middleware = permissionsPolicy(options)

    fastify.addHook('onRequest', function (req, reply, next) {
      middleware(req.raw, reply.raw, next)
    })
    next()
  },
  { fastify: '3.x', name: 'fastify-permissions-policy' },
)
