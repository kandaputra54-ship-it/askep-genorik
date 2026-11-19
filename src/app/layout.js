import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Askep Gerontik - Sistem Informasi Asuhan Keperawatan Lansia",
  description:
    "Dokumentasi pengkajian geriatri paripurna, deteksi sindrom geriatri, dan perencanaan asuhan keperawatan lanjut usia.",
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/android-chrome-192x192.png", type: "image/png", sizes: "192x192" },
      { url: "/android-chrome-512x512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  themeColor: "#2563eb",
  openGraph: {
    title: "Askep Gerontik - Sistem Informasi Asuhan Keperawatan Lansia",
    description:
      "Pendampingan & asuhan keperawatan lansia terpadu: pengkajian geriatri, deteksi sindrom geriatri, dan intervensi berbasis bukti.",
    url: "https://askepgerontik.id",
    siteName: "Askep Gerontik",
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-800 font-sans">
        {children}
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}