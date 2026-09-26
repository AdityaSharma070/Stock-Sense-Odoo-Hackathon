export default function Spinner({ className = '' }) {
  return (
    <div
      className={`h-4 w-4 rounded-full border-2 border-line border-t-accent animate-spin ${className}`}
      role="status"
      aria-label="Loading"
    />
  );
}
