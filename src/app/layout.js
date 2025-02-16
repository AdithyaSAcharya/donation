import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/component/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Golden Jubilee Contributions",
  description: "Golden Jubilee Contributions",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        
        <div className="mb-16">
          <Navbar />
        </div>
        {children}
      </body>
    </html>
  );
}
