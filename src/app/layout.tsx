import "@/styles/base/_base.scss";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Providers from "@/components/provider";

const inter = Poppins({
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Wytrenowani",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <head>
        {" "}
        <meta charSet="UTF-8" />
      </head>

      <Providers>
        <body className={inter.className}>{children}</body>
      </Providers>
    </html>
  );
}
