"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Revenue = {
  month: string;
  total: number;
};

interface MonthlyRevenueChartProps {
  data: Revenue[];
}

const MonthlyRevenueChart = ({ data }: MonthlyRevenueChartProps) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full">
      <h3 className="text-xl font-semibold mb-4">Faturamento Mensal</h3>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total" fill="#3b82f6" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyRevenueChart;
