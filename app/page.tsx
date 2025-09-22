'use client';

import dynamic from 'next/dynamic';

const HomePageClient = dynamic(() => import('../components/HomePageClient'), {
  ssr: false,
  loading: () => <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
});

export default function HomePage() {
  return <HomePageClient />;
}
