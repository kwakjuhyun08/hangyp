import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HanGyp",
  description: "2026 Korea–Egypt Youth Exchange Program",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className="h-full">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
