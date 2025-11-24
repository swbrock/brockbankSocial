import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Brockbank Social",
    description: "A vibrant hub for family reviews and sports predictions.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body className={`${inter.className} bg-gray-50 text-gray-800`}>
                    {/* Navbar Section */}
                    <header className="sticky top-0 z-50 bg-white shadow-md">
                        <div className="w-full px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
                            <Navbar />
                        </div>
                    </header>

                    {/* Main Content */}
                    <main className="min-h-screen">
                        <div className="w-full px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 py-8 bg-gray-100 shadow-inner">
                            {children}
                        </div>
                    </main>

                    {/* Footer */}
                    <footer className="bg-white py-4 shadow-t-lg">
                        <div className="w-full text-center text-gray-500 text-sm">
                            © 2025 Brockbank Social. All rights reserved.
                        </div>
                    </footer>
                </body>
            </html>
        </ClerkProvider>
    );
}
