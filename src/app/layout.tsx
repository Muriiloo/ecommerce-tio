"use client";

import { Poppins } from "next/font/google";
import "./globals.css";
import WhatsappButton from "@/components/whatsappButton";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { usePathname } from "next/navigation";
import { CartProvider } from "@/context/cartContext";

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
        <CartProvider>
          {!isAdmin && <WhatsappButton />}
          {!isAdmin && <Header />}
          {children}
          {!isAdmin && <Footer />}
        </CartProvider>
      </body>
    </html>
  );
}
