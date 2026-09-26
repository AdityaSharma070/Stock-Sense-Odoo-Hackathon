// src/components/ui/Spinner.jsx
export default function Spinner({ size = 20 }) {
  return (
    <div className="flex items-center justify-center py-8">
      <div
        className="animate-spin rounded-full border-2 border-line border-t-accent"
        style={{ width: size, height: size }}
        role="status"
        aria-label="Loading"
      />
    </div>
  );
}