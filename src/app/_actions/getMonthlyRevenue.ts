import { db } from "@/lib/prisma";

export const getMonthlyRevenue = async () => {
  const result = await db.$queryRaw<{ month: string; total: number }[]>`
    SELECT 
      TO_CHAR(DATE_TRUNC('month', "createdAt"), 'Mon YYYY') AS month,
      SUM("totalAmount")::float AS total
    FROM "Order"
    GROUP BY DATE_TRUNC('month', "createdAt")
    ORDER BY DATE_TRUNC('month', "createdAt")
    `;

  return result;
};
