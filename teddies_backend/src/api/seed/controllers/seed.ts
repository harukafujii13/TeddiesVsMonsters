/**
 * A set of functions called "actions" for `seed`
 */
import {
  priceArr,
  categoryArr,
  sizeArr,
  descriptionArr,
} from "../../../utils/seed";

function randInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randList<T>(arr: T[]) {
  return arr[randInt(0, arr.length - 1)];
}

export default {
  seedDB: async (ctx) => {
    if (process.env.NODE_ENV !== "development") {
      return (ctx.body = "This api is not callable in this environment");
    }

    const recordCount = await strapi.entityService.count(
      "api::product.product"
    );

    if (recordCount > 5) return (ctx.body = "You have more then 5 records");

    try {
      for (let i = 0; i < 15; i++) {
        const product = await strapi.entityService.create(
          "api::product.product",
          {
            data: {
              name: "SAMPLE",
              price: randList(priceArr),
              no_image: false,
              size: randList(sizeArr),
              category: randList(categoryArr),
              description: randList(descriptionArr),
              publishedAt: new Date().toISOString(),
            },
          }
        );
      }

      ctx.body = "seeded data! check out your database.";
    } catch (err) {
      ctx.body = err;
    }
  },
};
