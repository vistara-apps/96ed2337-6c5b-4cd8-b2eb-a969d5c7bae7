'use client';

import { MiniKitProvider } from '@coinbase/minikit';
import { OnchainKitProvider } from '@coinbase/onchainkit';
import { base } from 'wagmi/chains';
import { ErrorBoundary } from '../components/ErrorBoundary';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      <MiniKitProvider
        chain={base}
        apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY || ''}
      >
        <OnchainKitProvider
          apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY || ''}
          chain={base}
        >
          {children}
        </OnchainKitProvider>
      </MiniKitProvider>
    </ErrorBoundary>
  );
}
