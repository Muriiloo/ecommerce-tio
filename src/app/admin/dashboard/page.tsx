import { getMonthlyRevenue } from "@/app/services/dashboard/getMonthlyRevenue";
import { getWeeklyRevenue } from "@/app/services/dashboard/getWeeklyRevenue";
import { getDailyRevenue } from "@/app/services/dashboard/getDailyRevenue";
import { getValueTotalMonth } from "@/app/services/dashboard/getValueTotalMonth";
import { getTodayRevenue } from "@/app/services/dashboard/getTodayRevenue";
import { getWeekRevenue } from "@/app/services/dashboard/getWeekRevenue";

import MonthlyRevenueChart from "../_components/monthlyRevenueChart";
import WeeklyRevenueChart from "../_components/weeklyRevenueChart";
import DailyRevenueChart from "../_components/dailyRevenueChart";
import CardDashbord from "../_components/cardValueTotal";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user?.isAdmin) {
    redirect("/unauthorized");
  }

  const revenue = await getMonthlyRevenue();
  const weeklyRevenue = await getWeeklyRevenue();
  const dailyRevenue = await getDailyRevenue();
  const totalMonth = await getValueTotalMonth();
  const totalDay = await getTodayRevenue();
  const totalWeek = await getWeekRevenue();

  return (
    <div className="p-4 space-y-8">
      <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <CardDashbord title="Vendas do mês" total={totalMonth} />
        <CardDashbord title="Vendas da semana" total={totalWeek} />
        <CardDashbord title="Vendas do dia" total={totalDay} />
      </div>

      <div className="rounded-lg shadow-md w-full overflow-x-auto">
        <MonthlyRevenueChart data={revenue} />
      </div>

      <div className="rounded-lg shadow-md w-full overflow-x-auto">
        <WeeklyRevenueChart data={weeklyRevenue} />
      </div>

      <div className="rounded-lg shadow-md w-full overflow-x-auto">
        <DailyRevenueChart data={dailyRevenue} />
      </div>
    </div>
  );
};

export default Dashboard;
