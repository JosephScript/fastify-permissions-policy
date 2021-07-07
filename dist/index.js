"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fastify_plugin_1 = __importDefault(require("fastify-plugin"));
var permissions_policy_1 = __importDefault(require("permissions-policy"));
exports.default = fastify_plugin_1.default(function (fastify, options, next) {
    var middleware = permissions_policy_1.default(options);
    fastify.addHook('onRequest', function (req, reply, next) {
        middleware(req.raw, reply.raw, next);
    });
    next();
}, { fastify: '3.x', name: 'fastify-permissions-policy' });
//# sourceMappingURL=index.js.map