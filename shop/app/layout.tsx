import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import "./globals.css";
import MainLayout from "./layout/MainLayout";

export const metadata = {
  title: "My App",
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
