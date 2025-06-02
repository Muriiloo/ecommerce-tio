import { db } from "@/lib/prisma";

//TO AJUSTANDO ESSA QUERY AINDA NÃO MEXE

export const getValueTotalMonth = async () => {
  //pegando a data atual
  const now = new Date();
  //pegando o inicio e o fim do mes que estamos
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  //pegando o fim do mes que estamos
  const endOfMonth = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0,
    23,
    59,
    59
  );

  const result = await db.order.aggregate({
    _sum: {
      totalAmount: true,
    },
    where: {
      status: "paid",
      createdAt: {
        gte: startOfMonth,
        lte: endOfMonth,
      },
    },
  });

  console.log(result._sum.totalAmount);
  return result._sum.totalAmount?.toFixed(2) || "0.00";
};
