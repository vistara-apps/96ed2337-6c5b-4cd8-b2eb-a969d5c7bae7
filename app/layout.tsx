import type { Metadata } from 'next';
import { Providers } from './providers';
import './globals.css';

export const metadata: Metadata = {
  title: 'CollabForge - Find Your Creative Co-pilot',
  description: 'A social platform for discovering and connecting with creative collaborators based on skills and project needs within the Base ecosystem.',
  openGraph: {
    title: 'CollabForge - Find Your Creative Co-pilot',
    description: 'Find your creative co-pilot for epic projects.',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
