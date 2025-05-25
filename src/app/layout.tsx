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
  description: "A Reno-based running organization connecting mental health awareness with community running events. Founded by Sage Ridge School students to break down mental health stigmas.",
  keywords: ["running", "mental health", "Reno", "nonprofit", "community", "stigma", "awareness", "Sage Ridge School"],
  authors: [{ name: "Rushil Mahadevu" }, { name: "Rhys Ferrito" }],
  creator: "Strides Over Stigma",
  openGraph: {
    title: "Strides Over Stigma",
    description: "Breaking down mental health stigmas through running and community",
    url: "https://stridesoverstigma.com",
    siteName: "Strides Over Stigma",
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: "any" },
      { url: '/favicon-96x96.png', sizes: '96x96' },
      { url: '/favicon-192x192.png', sizes: '192x192' },
      { url: '/favicon-512x512.png', sizes: '512x512' }
    ],
    shortcut: { url: '/favicon.ico' },
    apple: { url: '/favicon-192x192.png' }
  },
  manifest: "/manifest.json"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
  