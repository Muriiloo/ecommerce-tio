"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const measureImages = {
  cintura: "/images/cintura.png",
  quadril: "/images/quadril.png",
  coxa: "/images/coxa.png",
};


interface DialogTableProps {
  product: {
    id: string;
    name: string;
    image: string | null;
    description: string;
    price: number;
    imageUrl: string;
    images: string[];
    details: string;
    stockQuantity: number;
  };
}

export default function DialogTable({ product }: DialogTableProps) {
  const [hovered, setHovered] = useState<"cintura" | "quadril" | "coxa" | null>(null);

  const defaultImage = product.imageUrl ?? "/images/produto.png";

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="link"
          className="mt-4 text-sm text-purple-700 underline hover:text-purple-900 p-0 h-auto cursor-pointer"
        >
          Tabela de Medidas
        </Button>
      </DialogTrigger>

      <DialogContent className="w-full !max-w-7xl p-0 sm:rounded-lg z-[9999] overflow-auto">
        <div className="flex flex-col md:flex-row !max-w-7xl !max-h-[90vh]">
          <div className="w-full md:w-1/3 bg-white flex items-center justify-center px-4">
            <Image
              src={hovered ? measureImages[hovered] : defaultImage}
              alt="teste"
              width={300}
              height={500}
              className="object-cover max-h-[500px] w-auto"
            />
          </div>

          <div className="w-full md:w-2/3 bg-white p-4 overflow-auto">
            <DialogHeader>
              <DialogTitle className="text-lg sm:text-2xl mb-4">
                Compare as medidas com esta tabela.
              </DialogTitle>
            </DialogHeader>

            <table className="min-w-full text-sm sm:text-base border-t border-gray-300 scale-90">

              <thead>
                <tr className="text-left border-b border-gray-300">
                  <th className="px-4 py-2">TAMANHO</th>
                  <th
                    className="px-4 py-2 cursor-pointer hover:text-purple-700"
                    onMouseEnter={() => setHovered("cintura")}
                    onMouseLeave={() => setHovered(null)}
                  >
                    CINTURA
                  </th>
                  <th
                    className="px-4 py-2 cursor-pointer hover:text-purple-700"
                    onMouseEnter={() => setHovered("quadril")}
                    onMouseLeave={() => setHovered(null)}
                  >
                    QUADRIL
                  </th>
                  <th
                    className="px-4 py-2 cursor-pointer hover:text-purple-700"
                    onMouseEnter={() => setHovered("coxa")}
                    onMouseLeave={() => setHovered(null)}
                  >
                    COXA
                  </th>
                </tr>
              </thead>
              <tbody>
                {[34, 36, 38, 40, 42, 44, 46].map((tam, index) => {
                  const cintura = 62 + index * 4;
                  const quadril = 90 + index * 4;
                  const coxa = 55 + index * 2;
                  return (
                    <tr key={tam} className="border-b border-gray-200">
                      <td className="px-4 py-2">{tam}</td>
                      <td className="px-4 py-2">{cintura}</td>
                      <td className="px-4 py-2">{quadril}</td>
                      <td className="px-4 py-2">{coxa}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <p className="mt-4 text-xs text-gray-500">Medidas: cm</p>
            <Button variant="outline" className="mt-2">
              Provador Virtual
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
