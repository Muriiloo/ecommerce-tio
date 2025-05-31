// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  console.log("🔄 Limpando dados antigos...");
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();

  console.log("👤 Criando usuário...");
  const user = await prisma.user.create({
    data: {
      name: "Admin",
      email: "admin@email.com",
      password: "hashed_password_aqui",
      isAdmin: true,
    },
  });

  console.log("📦 Criando produtos...");
  const product1 = await prisma.product.create({
    data: {
      name: "Camiseta Tech",
      description: "Camiseta com tecido tecnológico",
      price: 79.9,
      stockQuantity: 20,
      imageUrl: "https://via.placeholder.com/300",
    },
  });

  const product2 = await prisma.product.create({
    data: {
      name: "Boné Casual",
      description: "Boné leve e confortável",
      price: 39.9,
      stockQuantity: 15,
      imageUrl: "https://via.placeholder.com/300",
    },
  });

  console.log("🧾 Criando pedido com itens...");
  const order = await prisma.order.create({
    data: {
      userId: user.id,
      status: "paid",
      totalAmount: 159.7,
      paymentMethod: "pix",
      items: {
        create: [
          {
            productId: product1.id,
            quantity: 1,
            priceAtPurchase: product1.price,
          },
          {
            productId: product2.id,
            quantity: 2,
            priceAtPurchase: product2.price,
          },
        ],
      },
    },
  });

  console.log("✅ Seed concluída!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
