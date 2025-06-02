import { getMonthlyRevenue } from "@/app/_actions/getMonthlyRevenue";
import MonthlyRevenueChart from "../_components/monthlyRevenueChart";
import CardValueTotal from "../_components/cardValueTotal";

const Dashboard = async () => {
  const revenue = await getMonthlyRevenue();

  return (
    <div className="p-4 space-y-8">
      <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <CardValueTotal />
      </div>

      <div className=" rounded-lg shadow-md w-full overflow-x-auto">
        <MonthlyRevenueChart data={revenue} />
      </div>
    </div>
  );
};

export default Dashboard;
