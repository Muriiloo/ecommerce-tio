import { db } from "@/lib/prisma";

export const getDailyRevenue = async () => {
  const result = await db.$queryRaw<{ total: number }[]>`
    SELECT 
      SUM(totalAmount) AS total
    FROM \`Order\`
    WHERE status = 'pending'
      AND DATE(createdAt) = CURDATE()
  `;

  return {
    date: new Date().toISOString().split("T")[0],
    total: Number(result[0]?.total || 0),
  };
};
