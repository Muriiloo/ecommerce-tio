import { db } from "@/lib/prisma";

export const getWeeklyRevenue = async () => {
  const result = await db.$queryRaw<{ day: string; total: number }[]>`
    SELECT 
      DATE_FORMAT(createdAt, '%a %d/%m') AS day,
      SUM(totalAmount) AS total
    FROM \`Order\`
    WHERE status = 'pending'
      AND createdAt >= DATE_SUB(CURDATE(), INTERVAL 6 DAY)
    GROUP BY DATE(createdAt)
    ORDER BY DATE(createdAt)
  `;

  return result.map((r) => ({
    ...r,
    total: Number(r.total),
  }));
};
