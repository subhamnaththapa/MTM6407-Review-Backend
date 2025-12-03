/**
 * Public API routes for reviews (bypasses Strapi permissions)
 */

export default {
  routes: [
    {
      method: "GET",
      path: "/public/reviews",
      handler: async (ctx) => {
        try {
          // Direct database query - bypasses all permission checks
          const reviews = await strapi.db
            .query("api::review.review")
            .findMany({
              where: {
                publishedAt: {
                  $notNull: true,
                },
              },
              orderBy: {
                publishedAt: "desc",
              },
            });

          ctx.body = {
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
          ctx.status = 500;
          ctx.body = {
            error: "Failed to fetch reviews",
            message: error.message,
          };
        }
      },
    },
    {
      method: "GET",
      path: "/public/reviews/:id",
      handler: async (ctx) => {
        const { id } = ctx.params;
        try {
          const review = await strapi.db.query("api::review.review").findOne({
            where: { id },
          });

          if (!review) {
            ctx.status = 404;
            ctx.body = { error: "Review not found" };
            return;
          }

          ctx.body = { data: review };
        } catch (error) {
          ctx.status = 500;
          ctx.body = {
            error: "Failed to fetch review",
            message: error.message,
          };
        }
      },
    },
  ],
};
