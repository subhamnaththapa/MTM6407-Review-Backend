/**
 * Script to set public permissions for Review endpoints
 * Run this after Strapi starts
 */

export default async ({ strapi }) => {
  // Wait for Strapi to be fully initialized
  const publicRole = await strapi.db.query('plugin::users-permissions.role').findOne({
    where: { type: 'public' }
  });

  if (!publicRole) {
    console.log('❌ Public role not found');
    return;
  }

  // Get the review controller actions
  const reviewActions = [
    {
      controller: 'api::review.review',
      action: 'find',
      enabled: true,
      policy: ''
    },
    {
      controller: 'api::review.review',
      action: 'findOne',
      enabled: true,
      policy: ''
    }
  ];

  // Add permissions for public role
  for (const action of reviewActions) {
    const permissionKey = `${action.controller}.${action.action}`;
    
    const existingPermission = await strapi.db.query('plugin::users-permissions.permission').findOne({
      where: {
        role: publicRole.id,
        action: permissionKey
      }
    });

    if (!existingPermission) {
      await strapi.db.query('plugin::users-permissions.permission').create({
        data: {
          action: permissionKey,
          role: publicRole.id,
          enabled: true,
          policy: ''
        }
      });
      console.log(`✅ Granted permission: ${permissionKey}`);
    } else {
      console.log(`✅ Permission already exists: ${permissionKey}`);
    }
  }

  console.log('✅ Public permissions configured successfully');
};
