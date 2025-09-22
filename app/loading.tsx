export default function Loading() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="animate-pulse space-y-4 w-full max-w-xl px-4">
        <div className="h-16 bg-surface rounded-lg shadow-card"></div>
        <div className="space-y-3">
          <div className="h-32 bg-surface rounded-lg shadow-card"></div>
          <div className="h-32 bg-surface rounded-lg shadow-card"></div>
          <div className="h-32 bg-surface rounded-lg shadow-card"></div>
        </div>
      </div>
    </div>
  );
}
