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
      <body>
        {children}
      </body>
    </html>
  );
}
