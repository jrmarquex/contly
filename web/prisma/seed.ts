import { PrismaClient, ProductStatus, UserRole } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const categories = [
    { name: "Meta Ads", slug: "meta-ads" },
    { name: "TikTok Ads", slug: "tiktok-ads" },
    { name: "Google Ads", slug: "google-ads" },
    { name: "Proxys", slug: "proxys" },
    { name: "Variados", slug: "variados" },
  ];

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }

  const allCategories = await prisma.category.findMany();

  for (const category of allCategories) {
    const numProducts = Math.floor(Math.random() * 5) + 2; // 2-6
    for (let i = 0; i < numProducts; i++) {
      const title = `${category.name} Produto ${i + 1}`;
      const price = Math.floor(Math.random() * 9000 + 1000) / 100; // 10.00 - 100.00
      const compareAtPrice = Math.random() > 0.5 ? price * (1 + Math.random() * 0.6 + 0.1) : null;
      const status = Math.random() > 0.8 ? ProductStatus.OUT_OF_STOCK : ProductStatus.AVAILABLE;
      await prisma.product.upsert({
        where: { slug: `${category.slug}-p-${i + 1}` },
        update: {},
        create: {
          title,
          slug: `${category.slug}-p-${i + 1}`,
          description: `Descrição de ${title}`,
          price,
          compareAtPrice: compareAtPrice ? Number(compareAtPrice.toFixed(2)) : null,
          status,
          categoryId: category.id,
        },
      });
    }
  }

  const adminEmail = process.env.ADMIN_EMAIL ?? "admin@adefinir.com";
  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: { role: UserRole.ADMIN },
    create: {
      email: adminEmail,
      name: "Admin",
      displayName: "Admin",
      role: UserRole.ADMIN,
    },
  });

  console.log("Seed completed.", { admin: admin.email });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


