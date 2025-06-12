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

type WeeklyData = {
  day: string;
  total: string;
};

interface WeeklyRevenueChartProps {
  data: WeeklyData[];
}

const WeeklyRevenueChart = ({ data }: WeeklyRevenueChartProps) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full">
      <h3 className="text-xl font-semibold mb-4">Faturamento Semanal</h3>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total" fill="#10b981" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeeklyRevenueChart;
