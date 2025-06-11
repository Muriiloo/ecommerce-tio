import { db } from "@/lib/prisma";

export const getWeekRevenue = async () => {
  const now = new Date();

  // Início da semana (segunda-feira)
  const startOfWeek = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() - (now.getDay() === 0 ? 6 : now.getDay() - 1), // ajusta se for domingo
    0, 0, 0, 0
  );

  // Fim da semana (domingo às 23:59:59)
  const endOfWeek = new Date(
    startOfWeek.getFullYear(),
    startOfWeek.getMonth(),
    startOfWeek.getDate() + 6,
    23, 59, 59, 999
  );

  const result = await db.order.aggregate({
    _sum: {
      totalAmount: true,
    },
    where: {
      status: "pending", // ajustar depois para pagos
      createdAt: {
        gte: startOfWeek,
        lte: endOfWeek,
      },
    },
  });

  return result._sum.totalAmount?.toFixed(2) || "0.00";
};
