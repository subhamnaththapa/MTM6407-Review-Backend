# Backend (Strapi v4)

This folder contains the Strapi CMS backend for the Review Site.

## Quick Start

See the main project [README.md](../README.md) and [QUICKSTART.md](../QUICKSTART.md) for complete setup instructions.

## Local Development

```powershell
cd backend
npm install
npm run develop
```

Strapi will start at `http://localhost:1337`. Navigate to `/admin` to create an admin account and manage reviews.

## Content-Type: Review

```typescript
interface Review {
  title: string;           // Title of the review
  slug: string;            // URL-safe identifier (auto-generated from title)
  summary: string;         // Short summary
  body: string;            // Full review (rich text)
  rating: integer;         // 0-10 scale
  coverImage: string;      // Image URL
  category: string;        // e.g., "Movie"
  author: string;          // Author name
  publishedAt: datetime;   // Publication date
}
```

## Seeding Data

The database is auto-seeded with 10 sample movie reviews on first run. To manually import:

```powershell
node scripts/import-seeds.js
```

Environment variables:
- `STRAPI_URL` (default: http://localhost:1337)
- `STRAPI_API_TOKEN` (optional, for protected APIs)

## Deployment

For production deployment to Render, see [DEPLOYMENT.md](../DEPLOYMENT.md).

Environment variables needed:
- `NODE_ENV=production`
- `DATABASE_URL` (PostgreSQL connection string)
- `JWT_SECRET` (random string)
- `ADMIN_JWT_SECRET` (random string)

Feel free to check out the [Strapi GitHub repository](https://github.com/strapi/strapi). Your feedback and contributions are welcome!

## ✨ Community

- [Discord](https://discord.strapi.io) - Come chat with the Strapi community including the core team.
- [Forum](https://forum.strapi.io/) - Place to discuss, ask questions and find answers, show your Strapi project and get feedback or just talk with other Community members.
- [Awesome Strapi](https://github.com/strapi/awesome-strapi) - A curated list of awesome things related to Strapi.

---

<sub>🤫 Psst! [Strapi is hiring](https://strapi.io/careers).</sub>
