/**
 * A set of functions called "actions" for `token-decrypt`
 */
const { UnauthorizedError, ForbiddenError } = require("@strapi/utils").errors;

export default {
  tokenDecrypt: async (ctx, next) => {
    const { authorization } = ctx.request.header;

    if (!authorization) {
      throw new ForbiddenError("cannot find authorization header");
    }

    try {
      const token = authorization.split(" ")[1];
      console.log("running");

      const obj = await strapi.plugins["users-permissions"].services.jwt.verify(
        token
      );

      if (!obj.id) {
        throw new UnauthorizedError("token invalid");
      }
      // if the token is valid, obj will be returned
      return { authorization: true };
    } catch (error) {
      throw new UnauthorizedError("token invalid");
    }
  },
};
