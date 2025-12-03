/**
 * review router
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreRouter("api::review.review", {
  only: ["find", "findOne"],
  config: {
    find: {
      auth: false,
    },
    findOne: {
      auth: false,
    },
  },
});
