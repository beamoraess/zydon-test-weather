import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { WeatherProvider } from "@/context/WeatherContext";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./globals.css";
import { FavoriteCitiesProvider } from "@/context/FavoriteCitiesContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Previsão do Tempo",
  description: "Aplicação de previsão do tempo com Next.js",
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
        <WeatherProvider>
          <FavoriteCitiesProvider>{children}</FavoriteCitiesProvider>
        </WeatherProvider>
      </body>
    </html>
  );
}
