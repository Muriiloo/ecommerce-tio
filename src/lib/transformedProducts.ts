import { Product } from "@prisma/client";

export const transformProducts = (products: Product[]) => {
  return products.map((product) => ({
    id: product.id,
    name: product.name,
    description: product.description,
    price: Number(product.price),
  }));
};
