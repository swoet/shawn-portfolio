import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import Providers from "./providers";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Portfolio Admin - Shawn Mutogo",
  description: "Admin dashboard for managing portfolio content",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="tf-theme">
      <body
        className={`${inter.variable} ${poppins.variable} font-inter antialiased dark bg-black text-white`}
      >

        <Providers>
          {children}
        </Providers>

      </body>
    </html>
  );
}
