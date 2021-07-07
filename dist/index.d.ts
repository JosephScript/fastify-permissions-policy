/// <reference types="node" />
export interface PermissionsPolicyOptions {
    features: Record<string, string[]>;
}
declare const _default: import("fastify").FastifyPluginCallback<Readonly<PermissionsPolicyOptions>, import("http").Server>;
export default _default;
