import type { Metadata } from "next";
import "./globals.css";
import { PreviewProvider } from "./context/previewContext";
import { Zilla_Slab } from "next/font/google";

const zillaSlab = Zilla_Slab({
    subsets: ["latin"],
    weight: ["400", "700"],
    variable: "--font-zilla-slab",
});

export const metadata: Metadata = {
    title: "dotPDF",
    description: "Made by Sri",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <PreviewProvider>{children}</PreviewProvider>
            </body>
        </html>
    );
}
