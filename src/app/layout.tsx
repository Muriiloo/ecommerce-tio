"use client";

import { Poppins } from "next/font/google";
import "./globals.css";
import WhatsappButton from "@/components/whatsappButton";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { usePathname } from "next/navigation";
import { CartProvider } from "@/context/cartContext";
import { AuthProvider } from "@/context/authContext"; // ✅ Adicionado

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        <AuthProvider>
          <CartProvider>
            <div className="min-h-screen flex flex-col">
              {!isAdmin && <WhatsappButton />}
              {!isAdmin && <Header />}
              
              {/* Conteúdo principal ocupa o restante do espaço */}
              <main className="flex-grow">{children}</main>
              
              {!isAdmin && <Footer />}
            </div>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}