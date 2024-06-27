import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./_sections/nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ClockShift",
  description: "A web application to convert time between different time zones",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
