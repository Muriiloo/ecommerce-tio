import { Product } from "@prisma/client";

export const transformProducts = (products: Product[]) => {
  return products.map((product) => ({
    id: product.id,
    name: product.name,
    image: product.imageUrl || null,
    description: product.description,
    price: Number(product.price),
     stockQuantity: product.stockQuantity,
  }));
};
