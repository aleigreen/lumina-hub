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
  title: "Lumina Sanctum · Estudio de Tatuaje en Condesa, CDMX",
  description: "Estudio de tatuaje en la Colonia Condesa, Ciudad de México. Artistas residentes especializados en neo-gótico, anime, fine line, blackwork y full color. Agenda tu cita en luminasanctum.com",
  keywords: [
    "tatuaje cdmx", "tatuaje condesa", "estudio de tatuaje ciudad de mexico",
    "tattoo studio mexico city", "tatuaje anime", "tatuaje fine line",
    "tatuaje blackwork", "tatuaje full color", "tatuaje neo gotico",
    "lumina sanctum", "cesar sepulveda tatuaje", "tattoo condesa",
    "tatuaje cuauhtemoc", "mejores tatuadores cdmx",
  ],
  authors: [{ name: "Lumina Sanctum" }],
  creator: "Lumina Sanctum",
  metadataBase: new URL("https://luminasanctum.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: "https://luminasanctum.com",
    siteName: "Lumina Sanctum",
    title: "Lumina Sanctum · Estudio de Tatuaje en Condesa, CDMX",
    description: "Estudio de tatuaje en la Colonia Condesa, CDMX. Neo-gótico, anime, fine line, blackwork y full color. Agenda tu cita.",
    images: [
      {
        url: "/lumina/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Lumina Sanctum · Estudio de Tatuaje en Condesa, CDMX",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lumina Sanctum · Estudio de Tatuaje en Condesa, CDMX",
    description: "Estudio de tatuaje en la Colonia Condesa, CDMX. Neo-gótico, anime, fine line, blackwork y full color.",
    images: ["/lumina/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
