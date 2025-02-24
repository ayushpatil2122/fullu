import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Kalam } from "next/font/google"; 
import { Lexend } from "next/font/google";
import { Khula } from "next/font/google";
import { Lexend_Deca } from "next/font/google";



const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const kalam = Kalam({
  subsets: ["latin"], 
  weight: ["300", "400", "700"], 
  variable: "--font-kalam",
});
const khula = Khula({
  subsets: ["latin"],
  weight: ["400"], 
  variable: "--font-khula",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${kalam.variable} ${khula.variable} antialiased`}
      >
        {children}
        <Footer />
      </body>
    </html>
  );
}