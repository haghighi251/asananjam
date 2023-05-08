import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "آسان انجام",
  description: "پلتفرم خرید و فروش رایگان کالا و خدمات",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      dir="rtl"
      lang="fa">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
