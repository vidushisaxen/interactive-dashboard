import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import FinanceDashboardShell from "@/components/FinanceDashboardShell";
import { ThemeProvider } from "@/components/Themetoggler";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Quantro",
  description: "Quantro finance dashboard",
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`dark h-full antialiased`}
    >
      <body className="min-h-full">
        <ThemeProvider>
          <FinanceDashboardShell>{children}</FinanceDashboardShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
