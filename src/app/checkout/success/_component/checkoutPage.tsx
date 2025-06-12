"use client";

import { useRouter } from "next/navigation";
import { CheckCircle } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const CheckoutSuccess = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 p-6">
      <Card className="max-w-md w-full shadow-xl rounded-2xl border-none">
        <CardHeader className="flex flex-col items-center pt-6">
          <CheckCircle className="w-16 h-16 text-green-600 mb-4 animate-scale-up" />
          <CardTitle className="text-2xl text-gray-900">
            Pagamento Confirmado!
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center text-gray-700 px-6">
          <p>
            Obrigado pela sua compra! Seu pedido foi recebido e está sendo
            processado.
          </p>
          <p className="mt-2">
            Em breve enviaremos uma confirmação por e-mail.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center py-6">
          <Button
            onClick={() => router.push("/")}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full shadow-lg transition"
          >
            Voltar ao Início
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CheckoutSuccess;
