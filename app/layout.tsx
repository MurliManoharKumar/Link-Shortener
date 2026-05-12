import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider, SignInButton, SignUpButton, Show, UserButton } from "@clerk/nextjs";
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
  title: "LinkShort - Shorten Your URLs",
  description: "Fast, secure, and easy URL shortening service with authentication",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
        <ClerkProvider>
          <header className="sticky top-0 z-50 w-full border-b border-slate-700/50 bg-slate-950/80 backdrop-blur-xl">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 flex items-center justify-center font-bold text-white text-sm">📎</div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent hover:from-blue-300 hover:to-cyan-300 transition-all">LinkShort</span>
              </div>
              <nav className="flex items-center space-x-4">
                <Show when="signed-out">
                  <SignInButton mode="modal">
                    <button className="px-4 py-2 text-sm font-semibold text-slate-300 hover:text-white transition-colors rounded-lg hover:bg-slate-800/50">
                      Sign In
                    </button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <button className="px-4 py-2 text-sm font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white rounded-lg transition-all-smooth hover:shadow-lg hover:shadow-blue-500/30">
                      Sign Up
                    </button>
                  </SignUpButton>
                </Show>
                <Show when="signed-in">
                  <div className="h-8 w-8 rounded-full border-2 border-slate-600 hover:border-slate-500 transition-colors flex items-center justify-center overflow-hidden">
                    <UserButton />
                  </div>
                </Show>
              </nav>
            </div>
          </header>
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
