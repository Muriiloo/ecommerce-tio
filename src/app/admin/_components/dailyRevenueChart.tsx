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

interface DailyRevenue {
  date: string;
  total: string;
}

interface Props {
  data: DailyRevenue;
}

const DailyRevenueChart = ({ data }: Props) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full">
      <h3 className="text-xl font-semibold mb-4">Faturamento do Dia</h3>

      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={[data]}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total" fill="#f59e0b" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DailyRevenueChart;
