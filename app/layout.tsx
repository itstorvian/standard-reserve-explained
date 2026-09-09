import type { Metadata } from 'next';
import './globals.css';

const title = 'LUDUS — An interactive way to understand Standard Reserve.';
const description =
  'An interactive way to understand Standard Reserve. An unofficial educational project. Built by Torvian.';
const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;
const publicUrl = productionHost
  ? new URL(`https://${productionHost}`)
  : undefined;
const indexable = process.env.VERCEL_ENV
  ? process.env.VERCEL_ENV === 'production'
  : process.env.NODE_ENV === 'production';

export const metadata: Metadata = {
  title,
  description,
  metadataBase: publicUrl ?? new URL('http://localhost:3000'),
  ...(publicUrl ? { alternates: { canonical: '/' } } : {}),
  robots: { index: indexable, follow: true },
  icons: { icon: '/favicon.svg' },
  openGraph: {
    title,
    description,
    siteName: 'LUDUS',
    type: 'website',
    locale: 'en_US',
    ...(publicUrl ? { url: publicUrl } : {}),
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/opengraph-image'],
  },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  );
}
