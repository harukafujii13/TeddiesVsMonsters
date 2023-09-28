export default {
  routes: [
    {
      method: "GET",
      path: "/seed",
      handler: "seed.seedDB",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
