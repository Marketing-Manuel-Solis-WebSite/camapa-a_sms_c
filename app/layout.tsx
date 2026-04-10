import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Uniendo Familias con Manuel Solis | Abogado de Inmigración Houston TX",
  description:
    "El Abogado Manuel Solis tiene más de 30 años reuniendo familias. Consulta de inmigración en Houston, Texas. Llame ahora: +1 (832) 924-8272",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
