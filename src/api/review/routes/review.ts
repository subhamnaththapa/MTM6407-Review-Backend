/**
 * review router
 */

import { factories } from "@strapi/strapi";

export default {
  ...factories.createCoreRouter("api::review.review"),
  routes: [
    {
      method: "GET",
      path: "/reviews",
      handler: "review.find",
      config: {
        auth: false,
        policies: [],
      },
    },
    {
      method: "GET",
      path: "/reviews/:id",
      handler: "review.findOne",
      config: {
        auth: false,
        policies: [],
      },
    },
  ],
};
