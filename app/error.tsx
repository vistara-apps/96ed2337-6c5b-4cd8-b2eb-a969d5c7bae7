'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center space-y-4 max-w-md">
        <div className="text-6xl">😵</div>
        <h2 className="text-2xl font-bold text-text-primary">
          Something went wrong!
        </h2>
        <p className="text-text-secondary">
          We encountered an error while loading CollabForge. Please try again.
        </p>
        <button
          onClick={reset}
          className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors duration-200"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
