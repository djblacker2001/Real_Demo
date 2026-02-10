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
