import Navbar from "@/components/Navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Veil",
  description: "Anonymous decentralized app built on Solana",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link type="text/css" rel="stylesheet" href="/css/style.css" />
      </head>
      <body>
        {/* <Navbar /> */}
        {children}</body>
    </html>
  );
}
