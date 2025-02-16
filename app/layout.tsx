import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import '@/assets/styles/globals.css';
import { APP_NAME, APP_DESCRIPTION, SERVER_URL } from '@/lib/constants';
import { ThemeProvider } from "next-themes";
import Script from 'next/script'
import DataLayer from './data-layer'

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    template: `%s | ${APP_NAME}`,
    default: APP_NAME,
  },
  description: APP_DESCRIPTION,
  metadataBase: new URL(SERVER_URL),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <Script
          src="https://assets.adobedtm.com/81adfcd42355/2c67a3825f8a/launch-688c37746f3a-development.min.js" async
          strategy="beforeInteractive"
        />
      </head>
      <DataLayer />
      <body className={`${inter.className}`}>
        <ThemeProvider
          attribute='class'
          defaultTheme='light'
          enableSystem
          disableTransitionOnChange
        >
          {children}
      </ThemeProvider>
      </body>
    </html>
  );
}