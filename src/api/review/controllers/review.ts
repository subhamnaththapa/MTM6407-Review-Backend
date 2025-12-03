/**
 * review controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::review.review",
  ({ strapi }) => ({
    // Override find to allow public access
    async find(ctx) {
      try {
        // Fetch all published reviews
        const reviews = await strapi.entityService.findMany(
          "api::review.review",
          {
            filters: { publishedAt: { $notNull: true } },
            sort: { publishedAt: "desc" },
          }
        );

        return {
          data: reviews,
          meta: {
            pagination: {
              page: 1,
              pageSize: reviews.length,
              pageCount: 1,
              total: reviews.length,
            },
          },
        };
      } catch (error) {
        ctx.throw(500, "Error fetching reviews");
      }
    },

    // Override findOne to allow public access
    async findOne(ctx) {
      const { id } = ctx.params;
      try {
        const review = await strapi.entityService.findOne(
          "api::review.review",
          id
        );
        if (!review) {
          return ctx.notFound();
        }
        return { data: review };
      } catch (error) {
        ctx.throw(500, "Error fetching review");
      }
    },
  })
);
