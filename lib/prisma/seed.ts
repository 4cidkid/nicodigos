import { PrismaClient } from "@prisma/client";
import { consola } from "consola";
const prisma = new PrismaClient();

async function main() {
  const categories = await prisma.category.createManyAndReturn({
    data: [
      {
        name: "Windows keys",
        slug: "windows",
        description: "Windows keys",
        image: "https://via.placeholder.com/150",
        icon: "https://via.placeholder.com/50",
      },
      {
        name: "Office keys",
        slug: "office",
        description: "Office keys",
        image: "https://via.placeholder.com/150",
        icon: "https://via.placeholder.com/50",
      },
      {
        name: "Antivirus keys",
        slug: "antivirus",
        description: "Antivirus keys",
        image: "https://via.placeholder.com/150",
        icon: "https://via.placeholder.com/50",
      },
      {
        name: "Games keys",
        slug: "games",
        description: "Games keys",
        image: "https://via.placeholder.com/150",
        icon: "https://via.placeholder.com/50",
      },
    ],
  });

  const products = await prisma.product.createManyAndReturn({
    data: [
      {
        name: "Windows 10 Pro",
        slug: "windows-10-pro",
        description: "Windows 10 Pro",
        image: "https://via.placeholder.com/150",
        price: 100,
        categoryId: categories[0].id,
      },
      {
        name: "Office 2019",
        slug: "office-2019",
        description: "Office 2019",
        image: "https://via.placeholder.com/150",
        price: 50,
        categoryId: categories[1].id,
      },
      {
        name: "Kaspersky Total Security",
        slug: "kaspersky-total-security",
        description: "Kaspersky Total Security",
        image: "https://via.placeholder.com/150",
        price: 30,
        categoryId: categories[2].id,
      },
      {
        name: "FIFA 21",
        slug: "fifa-21",
        description: "FIFA 21",
        image: "https://via.placeholder.com/150",
        price: 60,
        categoryId: categories[3].id,
      },
    ],
  });

  const attributes = await prisma.attribute.createManyAndReturn({
    data: [
      {
        name: "License type",
        icon: "https://via.placeholder.com/50",
        description: "License type",
      },
      {
        name: "Delivery type",
        icon: "https://via.placeholder.com/50",
        description: "Delivery type",
      },
    ],
  });

  await prisma.productAttribute.createMany({
    data: [
      {
        productId: products[0].id,
        attributeId: attributes[0].id,
        value: "OEM",
      },
      {
        productId: products[0].id,
        attributeId: attributes[1].id,
        value: "Instant",
      },
      {
        productId: products[1].id,
        attributeId: attributes[0].id,
        value: "Retail",
      },
      {
        productId: products[1].id,
        attributeId: attributes[1].id,
        value: "Instant",
      },
      {
        productId: products[2].id,
        attributeId: attributes[0].id,
        value: "Retail",
      },
      {
        productId: products[2].id,
        attributeId: attributes[1].id,
        value: "Instant",
      },
      {
        productId: products[3].id,
        attributeId: attributes[0].id,
        value: "Retail",
      },
      {
        productId: products[3].id,
        attributeId: attributes[1].id,
        value: "Instant",
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
    consola.success("Seed completed");
  })
  .catch(async (error) => {
    consola.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
