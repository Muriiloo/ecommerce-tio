import { db } from "@/lib/prisma";

export const getWeeklyRevenue = async () => {
  await db.$executeRaw`SET lc_time_names = 'pt_BR';`;

  const result = await db.$queryRaw<{ day: string; total: string }[]>`
    SELECT
      DATE_FORMAT(createdAt, '%a %d/%m') AS day,
      SUM(totalAmount)           AS total
    FROM \`Order\`
    WHERE status = 'paid'
      AND createdAt >= DATE_SUB(CURDATE(), INTERVAL 6 DAY)
    GROUP BY DATE_FORMAT(createdAt, '%a %d/%m')
    ORDER BY MIN(createdAt)
  `;

  return result.map((r) => ({
    day: r.day,
    total: Number(r.total).toFixed(2),
  }));
};
