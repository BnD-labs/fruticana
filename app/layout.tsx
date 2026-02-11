import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
    subsets: ["latin"],
    variable: "--font-outfit",
    display: "swap",
});

export const metadata: Metadata = {
    title: "Fruticana | Future of Freshness",
    description: "Premium cold-pressed juices crafted for the discerning palate. Experience the future of freshness with our award-winning fruit juice collection.",
    keywords: ["juice", "premium juice", "cold-pressed", "healthy drinks", "fruit juice"],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={outfit.variable}>
            <body className={outfit.className}>{children}</body>
        </html>
    );
}
