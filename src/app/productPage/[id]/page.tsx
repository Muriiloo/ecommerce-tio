import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";
import ProductDetails from "../../../components/productDetails";

const prisma = new PrismaClient();

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: { id },
    include: { images: true },
  });

  if (!product) return notFound();

  return (
    <div className="max-w-7xl mx-auto p-6 mt-6">
      <ProductDetails
        product={{
          id: product.id,
          name: product.name,
          image: product.imageUrl,
          description: product.description,
          price: Number(product.price),
          imageUrl: product.imageUrl,
          images: product.images.map((img) => img.imageUrl),
          details: product.details || "",
          stockQuantity: product.stockQuantity,
        }}
      />
    </div>
  );
}
