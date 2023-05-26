import Head from "@/components/head";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import store, { persistor } from "@/services/Redux/store";
import "../public/assets/css/index.css";
import TopMenu from "@/components/TopNav/TopMenu";
import { Providers } from "@/services/Redux/provider";

// export const metadata = {
//   title: "آسان انجام",
//   description: "پلتفرم خرید و فروش رایگان کالا و خدمات",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      dir="rtl"
      lang="fa">
      <Head />
      <body>
        <Providers>
          <TopMenu />
          {children}
        </Providers>
      </body>
    </html>
  );
}
