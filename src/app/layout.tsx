import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Strides Over Stigma",
  description: "A Reno-based nonprofit running organization connecting mental health awareness with community running events. Founded by Sage Ridge School students to break down mental health stigmas.",
  keywords: ["running", "mental health", "Reno", "nonprofit", "community", "stigma", "awareness", "Sage Ridge School"],
  authors: [{ name: "Rushil Mahadevu" }, { name: "Rhys Ferrito" }],
  creator: "Strides Over Stigma",
  openGraph: {
    title: "Strides Over Stigma",
    description: "Breaking down mental health stigmas through running and community",
    url: "https://stridesoverstigma.web.app",
    siteName: "Strides Over Stigma",
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
