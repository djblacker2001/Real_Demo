import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import "antd/dist/reset.css";
import "./globals.css";
// Import Barlow (400, 500, 600, 700, 800, 900)
import "@fontsource/barlow/400.css";
import "@fontsource/barlow/500.css";
import "@fontsource/barlow/600.css";
import "@fontsource/barlow/700.css";
import "@fontsource/barlow/800.css";
import "@fontsource/barlow/900.css";

// Import Barlow Condensed (700, 900)
import "@fontsource/barlow-condensed/700.css";
import "@fontsource/barlow-condensed/900.css";
import MainLayout from "./layout/MainLayout";

export const metadata = {
  title: "Shop",
  description: "Next.js App Router",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
