import { DollarSign, TrendingUp } from "lucide-react";

interface CardDashbordProps {
  title: string;
  total: string;
  icon?: React.ReactNode;
  trend?: string;
  trendDirection?: "up" | "down";
}

const CardDashbord = async ({
  title,
  total,
  icon,
  trend = "+0%",
  trendDirection = "up",
}: CardDashbordProps) => {
  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center">
          {icon || <DollarSign className="w-6 h-6 text-green-600" />}
        </div>
        <div
          className={`flex items-center gap-1 ${
            trendDirection === "up" ? "text-green-600" : "text-red-600"
          }`}
        >
          <TrendingUp
            className={`w-4 h-4 ${
              trendDirection === "down" ? "rotate-180" : ""
            }`}
          />
          <span className="text-sm font-medium">{trend}</span>
        </div>
      </div>
      <h3 className="text-gray-600 font-medium mb-2">{title}</h3>
      <p className="text-2xl font-bold text-gray-900">R$ {total}</p>
    </div>
  );
};

export default CardDashbord;
