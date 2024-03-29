import type { Metadata } from 'next';
import './globals.css';
import AppProviders from '@/providers/AppProviders';

export const metadata: Metadata = {
  title: {
    default: 'Authentication App',
    template: '%s - Authentication App',
  },
  description: 'Authentication App',
  keywords: ['Authentication App', 'Next.js', 'TypeScript', 'Tailwind CSS'],
  authors: [
    {
      name: 'Christine Kinya',
    },
  ],
  creator: 'Christine Kinya',
  icons: {
    icon: './favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
