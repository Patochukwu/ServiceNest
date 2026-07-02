require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const { PrismaBetterSqlite3 } = require('@prisma/adapter-better-sqlite3');
const bcrypt = require('bcryptjs');

const dbUrl = process.env.DATABASE_URL || 'file:./dev.db';
const adapter = new PrismaBetterSqlite3({ url: dbUrl });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding database with SQLite adapter...');

  // 1. Seed Admin
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@servicenest.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@ServiceNest2024';
  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  const admin = await prisma.admin.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      name: 'ServiceNest Admin',
      password: hashedPassword,
    },
  });
  console.log(`Admin created/found: ${admin.email}`);

  // 2. Seed Services
  const services = [
    {
      name: 'Knotless Box Braids',
      slug: 'knotless-box-braids',
      category: 'hair-braiding',
      description: 'Natural, tension-free braids perfect for all hair types. Features hair parting grids, styling on African and American hair texture, and custom accessory additions.',
      longDesc: 'Knotless box braids are the ultimate protective style. Unlike traditional box braids, they do not require a knot at the scalp, making them completely painless and seamless. We specialize in working with both natural African textured hair and finer American hair profiles. The service includes professional hair washing, blow-drying, hair extensions, and finishing styling with high-quality foam mousse and gold/silver accessories.',
      price: 120.0,
      duration: 300,
      imageUrl: '/images/braiding/african-knotless.png',
      featured: true,
    },
    {
      name: 'Goddess Locs',
      slug: 'goddess-locs',
      category: 'hair-braiding',
      description: 'Boho-inspired locs with loose, wavy ends for a free spirit look.',
      longDesc: 'Goddess locs offer a gorgeous, bohemian, textured aesthetic. Using premium crochet extensions or individual wrapping techniques, we craft lightweight locs decorated with wavy ends. We provide customization options including color blends, length variations (12" to 30"), and hair jewelry (shells, threads, and rings). Safe for natural and relaxed hair.',
      price: 150.0,
      duration: 360,
      imageUrl: '/images/braiding/american-goddess-locs.png',
      featured: true,
    },
    {
      name: 'Tribal Cornrows',
      slug: 'tribal-cornrows',
      category: 'hair-braiding',
      description: 'Intricate geometric patterns rooted in African heritage.',
      longDesc: 'Tribal cornrows represent rich cultural heritage combined with modern beauty trends. Our stylists are experts in intricate geometric cornrows, feed-in braids, and stitch braiding. Ideal for clients looking for a highly personalized, sharp, and clean design. Can be finished with beads, gold cuffs, or left classic.',
      price: 90.0,
      duration: 240,
      imageUrl: '/images/braiding/african-tribal-cornrows.png',
      featured: true,
    },
    {
      name: 'Nkwobi Delight',
      slug: 'nkwobi',
      category: 'african-cuisine',
      description: 'Traditional spiced cow foot in rich palm kernel sauce, garnished with utazi leaves.',
      longDesc: 'Nkwobi is a classic Eastern Nigerian delicacy. We cook premium cow foot to tender perfection and toss it in a savory, spicy palm oil-based sauce made with traditional calabash nutmeg (ehuru), potash, and edible ugba. Served in a traditional wooden bowl (mgba) and garnished with fresh utazi leaves and sliced onions. Absolute comfort food.',
      price: 35.0,
      duration: 45,
      imageUrl: '/images/dishes/nkwobi.png',
      featured: true,
    },
    {
      name: 'Abacha (African Salad)',
      slug: 'abacha',
      category: 'african-cuisine',
      description: 'Sun-dried cassava with ugba, garden egg, and palm oil dressing.',
      longDesc: 'Abacha, also known as African Salad, is a beloved Nigerian dish. Made from processed, sun-dried cassava shreds, it is mixed with a rich, spiced palm oil dressing, ugba (oil bean seeds), and dried fish. It is garnished with fresh garden eggs, garden egg leaves, sliced onions, and served with a side of fried fish or ponmo. A refreshing and authentic delicacy.',
      price: 25.0,
      duration: 30,
      imageUrl: '/images/dishes/abacha.png',
      featured: true,
    },
    {
      name: 'Egusi Soup with Fufu',
      slug: 'egusi-soup',
      category: 'african-cuisine',
      description: 'Rich melon seed soup with assorted meats, stockfish, and leafy greens.',
      longDesc: 'Our Egusi soup is cooked using the traditional frying method, combining grounded melon seeds with rich palm oil, beef, tripe (shaki), stockfish, dry fish, and fresh pumpkin leaves (ugwu) or bitter leaf. Served piping hot with your choice of swallow (Pounded Yam, Garri/Eba, or Oatmeal Fufu). Perfect for a hearty African meal.',
      price: 45.0,
      duration: 60,
      imageUrl: '/images/dishes/egusi-soup.png',
      featured: true,
    },
  ];

  for (const svc of services) {
    const service = await prisma.service.upsert({
      where: { slug: svc.slug },
      update: svc,
      create: svc,
    });
    console.log(`Service created/updated: ${service.name}`);
  }

  // 3. Seed Reviews
  const reviews = [
    {
      customerName: 'Amara Okonkwo',
      email: 'amara@example.com',
      serviceType: 'hair-braiding',
      rating: 5,
      comment: 'Absolutely stunning knotless braids! The attention to detail is incredible. My hair has never looked this beautiful. I get compliments everywhere I go. ServiceNest is the ONLY place I trust with my hair.',
      approved: true,
      featured: true,
    },
    {
      customerName: 'Jennifer Williams',
      email: 'jennifer@example.com',
      serviceType: 'hair-braiding',
      rating: 5,
      comment: 'As an American woman trying African braiding for the first time, I was nervous. But the team here made me feel so comfortable! My goddess locs look absolutely magical. Will definitely be back!',
      approved: true,
      featured: true,
    },
    {
      customerName: 'Chidi Eze',
      email: 'chidi@example.com',
      serviceType: 'african-cuisine',
      rating: 5,
      comment: 'The Nkwobi tastes exactly like back home in Anambra. I shed a tear — it brought back so many memories. Finding authentic Igbo food in North Dakota is nearly impossible, but ServiceNest delivers perfection every time.',
      approved: true,
      featured: true,
    },
  ];

  await prisma.review.deleteMany({});
  for (const r of reviews) {
    const review = await prisma.review.create({
      data: r,
    });
    console.log(`Review added from: ${review.customerName}`);
  }

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
