export default {
  routes: [
    {
      method: 'GET',
      path: '/api/reviews/public',
      handler: async (ctx) => {
        try {
          const reviews = await strapi.entityService.findMany(
            'api::review.review',
            {
              fields: ['id', 'title', 'slug', 'summary', 'rating', 'coverImage', 'category'],
              filters: {
                publishedAt: {
                  $notNull: true,
                }
              },
              sort: { publishedAt: 'desc' },
              limit: 100,
            }
          );

          ctx.body = {
            data: reviews,
            meta: {
              pagination: {
                page: 1,
                pageSize: reviews.length,
                pageCount: 1,
                total: reviews.length
              }
            }
          };
        } catch (error) {
          console.error('Error:', error);
          ctx.status = 500;
          ctx.body = { error: 'Failed to fetch reviews' };
        }
      },
      config: {
        auth: false,
        policies: [],
      }
    }
  ]
};
