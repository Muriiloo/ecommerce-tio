import { getMonthlyRevenue } from "@/app/services/dashboard/getMonthlyRevenue";
import { getWeeklyRevenue } from "@/app/services/dashboard/getWeeklyRevenue";
import { getValueTotalMonth } from "@/app/services/dashboard/getValueTotalMonth";
import { getTodayRevenue } from "@/app/services/dashboard/getTodayRevenue";
import { getWeekRevenue } from "@/app/services/dashboard/getWeekRevenue";

import MonthlyRevenueChart from "../_components/monthlyRevenueChart";
import WeeklyRevenueChart from "../_components/weeklyRevenueChart";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { DollarSign, TrendingUp, Calendar, BarChart3 } from "lucide-react";

const Dashboard = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user?.isAdmin) {
    redirect("/unauthorized");
  }
  const revenue = await getMonthlyRevenue();
  const weeklyRevenue = await getWeeklyRevenue();
  const totalMonth = await getValueTotalMonth();
  const totalDay = await getTodayRevenue();
  const totalWeek = await getWeekRevenue();
  return (
    <div>
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-3xl flex items-center justify-center shadow-2xl">
            <BarChart3 className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 bg-clip-text text-transparent">
              Dashboard Admin
            </h1>
            <p className="text-xl text-gray-600 mt-2">
              Visão geral do seu e-commerce
            </p>
          </div>
        </div>
      </div>

          {/* Cards de Receita Principal */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center justify-between mb-6">
                {" "}
                <div className="w-14 h-14 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center">
                  <Calendar className="w-7 h-7 text-green-600" />
                </div>
              </div>
              <h3 className="text-gray-600 font-medium mb-2">Vendas do Mês</h3>
              <p className="text-3xl font-bold text-gray-900 mb-1">
                R$ {totalMonth}
              </p>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center justify-between mb-6">
                {" "}
                <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl flex items-center justify-center">
                  <TrendingUp className="w-7 h-7 text-blue-600" />
                </div>
              </div>
              <h3 className="text-gray-600 font-medium mb-2">
                Vendas da Semana
              </h3>
              <p className="text-3xl font-bold text-gray-900 mb-1">
                R$ {totalWeek}
              </p>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center justify-between mb-6">
                {" "}
                <div className="w-14 h-14 bg-gradient-to-br from-orange-100 to-amber-100 rounded-2xl flex items-center justify-center">
                  <DollarSign className="w-7 h-7 text-orange-600" />
                </div>
              </div>
              <h3 className="text-gray-600 font-medium mb-2">Vendas do Dia</h3>
              <p className="text-3xl font-bold text-gray-900 mb-1">
                R$ {totalDay}
              </p>
            </div>{" "}
          </div>

          {/* Gráficos */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
            <div className="bg-white/50 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
              <div className="mb-6">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                  Receita Mensal
                </h3>
                <p className="text-gray-600">
                  Evolução das vendas ao longo do ano
                </p>
              </div>
              <div className="rounded-2xl overflow-hidden">
                <MonthlyRevenueChart data={revenue} />
              </div>
            </div>

            <div className="bg-white/50 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
              <div className="mb-6">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                  Receita Semanal
                </h3>                <p className="text-gray-600">Performance das últimas semanas</p>
              </div>
              <div className="rounded-2xl overflow-hidden">
                <WeeklyRevenueChart data={weeklyRevenue} />
              </div>
            </div>
          </div>
        </div>
    );
};

export default Dashboard;
