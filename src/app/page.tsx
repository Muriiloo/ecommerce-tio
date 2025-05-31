import { db } from "@/lib/prisma";

const Home = async () => {
  const products = await db.product.findMany({});

  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>Price: ${Number(product.price)}</p>
        </div>
      ))}
    </div>
  );
};

export default Home;
