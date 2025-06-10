import { db } from "@/lib/prisma";

export const getTodayRevenue = async () => {
  const now = new Date();
  const startOfDay = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    0,
    0,
    0,
    0
  );
  const endOfDay = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    23,
    59,
    59,
    999
  );

  const result = await db.order.aggregate({
    _sum: {
      totalAmount: true,
    },
    where: {
      status: "pending", // ajustar depois para filtrar por pagos
      createdAt: {
        gte: startOfDay,
        lte: endOfDay,
      },
    },
  });

  return result._sum.totalAmount?.toFixed(2) || "0.00";
};
