import Header from "@/components/Header";
import ReactQueryProvider from "@/components/providers/react-query-provider";
import { SessionProvider } from "@/components/providers/session-provider";
import ThemeProvider from "@/components/providers/theme-provider";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";

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
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("antialiased min-h-screen", font.variable)}>
        <ReactQueryProvider>
          <SessionProvider>
            <ThemeProvider>
              {modal}
              <Header />
              {children}
            </ThemeProvider>
          </SessionProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
