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
  title: "Strides Over Stigma | Reno Mental Health Organization & Youth-Led Movement",
  description:
    "Strides Over Stigma is a student-led organization promoting mental health awareness through community running events in Reno. Run with us to break the stigma.",
  keywords: [
    "mental health",
    "mental health awareness",
    "Reno 5K",
    "youth led",
    "community running",
    "Strides Over Stigma",
    "break the stigma",
    "mental wellness",
    "Sage Ridge School"
  ],
  authors: [{ name: "Rushil Mahadevu" }, { name: "Rhys Ferrito" }],
  creator: "Strides Over Stigma",
  openGraph: {
    title: "Strides Over Stigma | Youth-Led Reno 5K for Mental Health",
    description:
      "Break the silence around mental health. Join our 5K events in Reno and be part of a movement powered by community, healing, and youth leadership.",
    url: "https://stridesoverstigma.com",
    siteName: "Strides Over Stigma",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://stridesoverstigma.com/og-image.jpg", // Add this image to /public
        width: 1200,
        height: 630,
        alt: "Strides Over Stigma Mental Health 5K"
      }
    ]
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
  