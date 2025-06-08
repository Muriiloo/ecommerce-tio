"use client";

import { Poppins } from "next/font/google";
import "./globals.css";
import WhatsappButton from "@/components/whatsappButton";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { usePathname } from "next/navigation";
import { CartProvider } from "@/context/cartContext";
import { SessionProvider } from "next-auth/react";
import { AuthProvider } from "@/context/authContext";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");
  const hideHeaderFooter = pathname.startsWith("/login");
  const hideRegister = pathname.startsWith("/registro");

  return (
    <html lang="pt-BR">
      <body className={`${poppins.className} antialiased`}>
        <SessionProvider>
          <AuthProvider>
            <CartProvider>
              <div className="min-h-screen flex flex-col">
                {!isAdmin && !hideHeaderFooter && !hideRegister && (
                  <WhatsappButton />
                )}
                {!isAdmin && !hideHeaderFooter && !hideRegister && <Header />}

                <main className="flex-grow">{children}</main>

                {!isAdmin && !hideHeaderFooter && !hideRegister && <Footer />}
              </div>
            </CartProvider>
          </AuthProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
