import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import "@/styles/globals.css";
import FramerMotionProvider from "@/components/providers/framer-motion-provider";
import ThemeProvider from "@/components/providers/theme-provider";
import ReactQueryProvider from "@/components/providers/react-query-provider";
import { Toaster } from "@/components/ui/sonner";
import Header from "@/components/Header";
import { SessionProvider } from "@/components/providers/session-provider";

const font = Ubuntu({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-ubuntu",
});

export const metadata: Metadata = {
  title: "Tide",
  description: "Tide - The modern and perfect social media app.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("antialiased max-h-screen", font.variable)}>
        <SessionProvider>
          <FramerMotionProvider>
            <ThemeProvider>
              <ReactQueryProvider>
                <Header />
                {children}
                <Toaster />
              </ReactQueryProvider>
            </ThemeProvider>
          </FramerMotionProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
