import "./globals.css";
import type { ReactNode } from "react";
import Layout from "../components/Layout";

export const metadata = {
  title: "Sandy's Trendy Wear",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
