import { getValueTotalMonth } from "@/app/_actions/getValueTotalMonth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CardValueTotal = async () => {
  const total = await getValueTotalMonth();

  return (
    <Card className="w-full max-w-[400px]">
      <CardHeader className="pt-4">
        <CardTitle>Vendas do mês</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-semibold text-green-600">R$ {total}</p>
      </CardContent>
    </Card>
  );
};

export default CardValueTotal;
