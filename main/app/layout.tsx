import type { Metadata } from "next";
import "./globals.css";
import { PreviewProvider } from "./context/previewContext";

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
