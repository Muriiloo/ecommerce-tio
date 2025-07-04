import { db } from "@/lib/prisma";

export const getMonthlyRevenue = async () => {
  const result = await db.$queryRaw<{ month: string; total: number }[]>`
    SELECT 
      DATE_FORMAT(MIN(createdAt), '%b %Y') AS month,
      SUM(totalAmount) AS total
    FROM \`Order\`
    WHERE status = 'paid'
    GROUP BY YEAR(createdAt), MONTH(createdAt)
    ORDER BY YEAR(createdAt), MONTH(createdAt)
    `;

  return result.map((r) => ({
    ...r,
    total: Number(r.total).toFixed(2),
  }));
};
