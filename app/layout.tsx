import { Inter, Roboto_Slab } from 'next/font/google';
import { ThemeModeScript } from 'flowbite-react';
import { Toaster } from 'react-hot-toast';
import './globals.css';


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  variable: "--font-roboto-slab",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${robotoSlab.variable}`}>
      <head>
        <ThemeModeScript />
      </head>
      <body className="antialiased">
        {children} <Toaster />
      </body>
    </html>
  );
}
