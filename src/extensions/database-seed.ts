/**
 * Seed database on first run
 */
export async function seed(strapi) {
  const reviews = [
    {
      title: "Starlight Horizon",
      slug: "starlight-horizon",
      summary: "A thoughtful sci-fi drama about memory and identity.",
      body: "Starlight Horizon explores what it means to be human in a world of memory editing. The film balances quiet performances with startling visuals.",
      rating: 8,
      coverImage: "https://via.placeholder.com/800x450?text=Starlight+Horizon",
      category: "Movie",
      author: "A. Reviewer",
      publishedAt: "2024-03-10T10:00:00Z"
    },
    {
      title: "Neon Run",
      slug: "neon-run",
      summary: "A fast-paced cyberpunk heist with spectacular chases.",
      body: "Neon Run delivers kinetic action and a pulsing synth soundtrack. The characters are archetypes, but the set pieces are memorable.",
      rating: 7,
      coverImage: "https://via.placeholder.com/800x450?text=Neon+Run",
      category: "Movie",
      author: "A. Reviewer",
      publishedAt: "2024-06-01T12:00:00Z"
    },
    {
      title: "The Quiet Library",
      slug: "the-quiet-library",
      summary: "An intimate drama about family secrets unfolding in a small town library.",
      body: "The Quiet Library slowly unfolds its mysteries, relying on performances and atmosphere rather than plot twists.",
      rating: 8,
      coverImage: "https://via.placeholder.com/800x450?text=The+Quiet+Library",
      category: "Movie",
      author: "A. Reviewer",
      publishedAt: "2023-11-20T09:30:00Z"
    },
    {
      title: "Asteroid Outpost",
      slug: "asteroid-outpost",
      summary: "A tense survival story on the far edge of the solar system.",
      body: "Asteroid Outpost pairs claustrophobic tension with scientific detail, delivering a compelling survival story.",
      rating: 7,
      coverImage: "https://via.placeholder.com/800x450?text=Asteroid+Outpost",
      category: "Movie",
      author: "A. Reviewer",
      publishedAt: "2025-02-14T15:00:00Z"
    },
    {
      title: "Paper Town Choir",
      slug: "paper-town-choir",
      summary: "A bittersweet musical about community and memory.",
      body: "Paper Town Choir charms with its score and modest story, offering several touching moments.",
      rating: 6,
      coverImage: "https://via.placeholder.com/800x450?text=Paper+Town+Choir",
      category: "Movie",
      author: "A. Reviewer",
      publishedAt: "2023-05-04T08:00:00Z"
    },
    {
      title: "Glass Harbor",
      slug: "glass-harbor",
      summary: "A visual masterpiece that meditates on loss and the passage of time.",
      body: "Glass Harbor is slow and beautiful; its imagery lingers but demands patience from its viewers.",
      rating: 9,
      coverImage: "https://via.placeholder.com/800x450?text=Glass+Harbor",
      category: "Movie",
      author: "A. Reviewer",
      publishedAt: "2022-12-11T11:45:00Z"
    },
    {
      title: "Kingdoms Fall",
      slug: "kingdoms-fall",
      summary: "An ambitious fantasy epic with lavish production design.",
      body: "Kingdoms Fall dazzles with scale and costumes, though the story sometimes loses focus amidst the spectacle.",
      rating: 7,
      coverImage: "https://via.placeholder.com/800x450?text=Kingdoms+Fall",
      category: "Movie",
      author: "A. Reviewer",
      publishedAt: "2024-09-02T18:00:00Z"
    },
    {
      title: "Midnight Postcards",
      slug: "midnight-postcards",
      summary: "A rom-com that subverts the genre with sharp dialogue.",
      body: "Midnight Postcards surprises with its witty script and chemistry between leads, making it a pleasant watch.",
      rating: 8,
      coverImage: "https://via.placeholder.com/800x450?text=Midnight+Postcards",
      category: "Movie",
      author: "A. Reviewer",
      publishedAt: "2024-07-21T20:00:00Z"
    },
    {
      title: "Silent Frequency",
      slug: "silent-frequency",
      summary: "A psychological thriller about sound and perception.",
      body: "Silent Frequency uses sound design as a storytelling tool, creating unease and subtle scares.",
      rating: 8,
      coverImage: "https://via.placeholder.com/800x450?text=Silent+Frequency",
      category: "Movie",
      author: "A. Reviewer",
      publishedAt: "2025-01-05T14:30:00Z"
    },
    {
      title: "Riverside Market",
      slug: "riverside-market",
      summary: "An uplifting indie about strangers whose lives intersect at a market.",
      body: "Riverside Market is heartfelt and intimate, a slice-of-life film that rewards quiet attention.",
      rating: 7,
      coverImage: "https://via.placeholder.com/800x450?text=Riverside+Market",
      category: "Movie",
      author: "A. Reviewer",
      publishedAt: "2023-08-19T10:15:00Z"
    }
  ];

  try {
    // Check if any reviews exist
    const count = await strapi.db
      .query('api::review.review')
      .count();

    if (count > 0) {
      console.log('[SEED] Reviews already exist, skipping seed.');
      return;
    }

    // Create each review
    for (const review of reviews) {
      await strapi.entityService.create('api::review.review', {
        data: {
          ...review,
          publishedAt: new Date(review.publishedAt)
        }
      });
    }

    console.log(`[SEED] Successfully created ${reviews.length} reviews.`);
  } catch (err) {
    console.error('[SEED] Error seeding reviews:', err);
  }
}
