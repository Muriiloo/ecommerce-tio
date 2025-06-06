import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";
import ProductDetails from "./productDetails";

const prisma = new PrismaClient();

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id: id },
  });

  if (!product) return notFound();

  return (
    <div className="max-w-3xl mx-auto p-6">
      <ProductDetails
        product={{
          id: product.id,
          name: product.name,
          description: product.description,
          imageUrl: product.imageUrl,
          price: Number(product.price),
        }}
      />
    </div>
  );
}
