import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Majestic Paths",
  description: "'If you are looking for a perfect holiday experience with memories to cherish you are at the right place. Let\'s plan a reasonable stay for you.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className='tracking-tight'>
      <body
        className={`${raleway.className} antialiased text-gray-800`}
      >
        <Toaster position="top-center" />
        {children}
      </body>
    </html>
  );
}
