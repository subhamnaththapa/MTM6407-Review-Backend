import type { Core } from '@strapi/strapi';
import { seed } from './extensions/database-seed';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    await seed(strapi);

    // Add public API routes that bypass Strapi permissions
    strapi.server.routes([
      {
        method: 'GET',
        path: '/api/public/reviews',
        handler: async (ctx) => {
          try {
            const reviews = await strapi.db
              .query('api::review.review')
              .findMany({
                where: {
                  publishedAt: {
                    $notNull: true,
                  },
                },
                orderBy: {
                  publishedAt: 'desc',
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
              error: 'Failed to fetch reviews',
              message: error.message,
            };
          }
        },
      },
      {
        method: 'GET',
        path: '/api/public/reviews/:id',
        handler: async (ctx) => {
          const { id } = ctx.params;
          try {
            const review = await strapi.db
              .query('api::review.review')
              .findOne({
                where: { id },
              });

            if (!review) {
              ctx.status = 404;
              ctx.body = { error: 'Review not found' };
              return;
            }

            ctx.body = { data: review };
          } catch (error) {
            ctx.status = 500;
            ctx.body = {
              error: 'Failed to fetch review',
              message: error.message,
            };
          }
        },
      },
    ]);
  },
};
