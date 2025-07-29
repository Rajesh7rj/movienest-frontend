import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";


export const metadata: Metadata = {
  title: "MovieNest",
  description: "Manage your favorite movies – Create, Edit, Explore.",
  keywords: ["movies", "movie manager", "NestJS", "Next.js", "React", "Fullstack App"],
  authors: [{ name: "Rajesh Janyani" }],
  creator: "Rajesh Janyani",
  icons: "/favicon.ico",
  openGraph: {
    title: "MovieNest 🎬",
    description: "Manage your favorite movies – Create, Edit, Explore.",
    url: "https://movienest.vercel.app",
    siteName: "MovieNest",
    images: [
      {
        url: "/icons/app_icon.svg",
        width: 1200,
        height: 630,
        alt: "MovieNest App",
      },
    ],
    type: "website",
  },
};

const geist = Geist({
  subsets: ["latin"],
  weight: ["400", "500", "700"], 
  variable: "--font-geist", 
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geist.className}>
      <body className={`relative min-h-screen bg-[#093545]`}>
        <Toaster position="top-right" toastOptions={{ duration: 3000 }} />

        <main className="pb-8">{children}</main>

        <footer>
        <img
          src="/images/login-footer.svg"
          alt="Login Footer"
          className="absolute bottom-0 left-0 w-full z-0 pointer-events-none"
        />
        </footer>
      </body>
    </html>
  );
}
