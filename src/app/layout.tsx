import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const display = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "FounderOS | AI Boardroom",
  description: "Accelerate your startup with an AI executive board.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: "#fcfdff",
          colorBackground: "#0a0a0c",
          colorInputBackground: "#0a0a0c",
          colorInputText: "#fcfdff",
        },
      }}
    >
      <html lang="en" className="bg-black">
        <body
          className={`${inter.variable} ${display.variable} antialiased font-sans bg-black text-ink`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
