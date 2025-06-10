import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CardDashbordProps {
  title: string;
  total: string;
}

const CardDashbord = async ({ title, total }: CardDashbordProps) => {
  return (
    <Card className="w-full max-w-[400px]">
      <CardHeader className="pt-4">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-semibold text-green-600">R$ {total}</p>
      </CardContent>
    </Card>
  );
};

export default CardDashbord;
