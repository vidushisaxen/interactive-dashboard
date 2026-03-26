import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import FinanceDashboardShell from "@/components/FinanceDashboardShell";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Interactive Dashboard",
  description: "Interactive Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <FinanceDashboardShell>{children}</FinanceDashboardShell>
      </body>
    </html>
  );
}