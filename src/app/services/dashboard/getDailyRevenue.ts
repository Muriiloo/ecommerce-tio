import { db } from "@/lib/prisma";

export const getDailyRevenue = async () => {
  const result = await db.$queryRaw<{ total: number }[]>`
    SELECT 
      SUM(totalAmount) AS total
    FROM \`Order\`
    WHERE status = 'pending'
      AND DATE(createdAt) = CURDATE()
  `;

  const now = new Date();
  const formattedDate = now.toLocaleDateString("pt-BR"); // ex: "11/06/2025"

  return {
    date: formattedDate,
    total: Number(result[0]?.total || 0).toFixed(2),
  };
};
