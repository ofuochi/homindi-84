import type React from "react";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Homindi - African Food Marketplace",
  description:
    "Your trusted source for authentic African foods and ingredients",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: undefined,
        variables: {
          colorPrimary: "#0B8457",
          colorBackground: "#ffffff",
          colorInputBackground: "#ffffff",
          colorInputText: "#1f2937",
        },
        elements: {
          formButtonPrimary: "bg-[#0B8457] hover:bg-[#0a7249]",
          card: "shadow-lg",
          headerTitle: "font-poppins",
          headerSubtitle: "font-inter",
        },
      }}
    >
      <html
        lang="en"
        suppressHydrationWarning
        className={`${inter.variable} ${poppins.variable}`}
      >
        <body className="font-inter antialiased">
          <Providers>{children}</Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
