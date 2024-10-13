import { PrismaClient } from "@prisma/client";
import { consola } from "consola";
import { faker } from "@faker-js/faker";
const prisma = new PrismaClient();

async function main() {
  const categories = await prisma.category.createManyAndReturn({
    data: Array.from({ length: 10 }).map(() => ({
      name: faker.commerce.department(),
      slug: faker.lorem.slug(),
      description: faker.commerce.productDescription(),
      image: faker.image.urlPlaceholder({ width: 150, height: 150 }),
      icon: faker.image.urlPlaceholder({ width: 50, height: 50 }),
    })),
  });

  const products = await prisma.product.createManyAndReturn({
    data: Array.from({ length: 20 }).map(() => ({
      name: faker.commerce.productName(),
      slug: faker.lorem.slug(),
      description: faker.commerce.productDescription(),
      image: faker.image.urlPlaceholder({ width: 300, height: 300 }),
      price: Number(
        faker.commerce.price({
          min: 10,
          max: 100,
          dec: 2,
        })
      ),
      categoryId: faker.helpers.arrayElement(categories).id,
    })),
  });

  const attributes = await prisma.attribute.createManyAndReturn({
    data: Array.from({ length: 5 }).map(() => ({
      name: faker.commerce.productMaterial(),
      icon: faker.image.urlPlaceholder({ width: 50, height: 50 }),
      description: faker.lorem.sentence(),
    })),
  });

  await prisma.productAttribute.createMany({
    data: products.flatMap((product) => {
      return attributes.map((attribute) => ({
        productId: product.id,
        attributeId: attribute.id,
        value: faker.commerce.productAdjective(),
      }));
    }),
  });

  await prisma.subcategory.createMany({
    data: Array.from({ length: 20 }).map(() => ({
      name: faker.commerce.productName(),
      slug: faker.lorem.slug(),
      icon: faker.image.urlPlaceholder({ width: 50, height: 50 }),
      description: faker.commerce.productDescription(),
      categoryId: faker.helpers.arrayElement(categories).id,
    })),
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
