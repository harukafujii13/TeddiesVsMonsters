export default {
  routes: [
    {
      method: "GET",
      path: "/token-decrypt",
      handler: "token-decrypt.tokenDecrypt",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
