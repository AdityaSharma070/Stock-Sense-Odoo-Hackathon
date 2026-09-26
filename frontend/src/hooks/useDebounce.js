import { useEffect, useState } from 'react';

// Debounces a fast-changing value (e.g. a search input) so we don't
// fire a request on every keystroke. Use: const debounced = useDebounce(query, 300);
export default function useDebounce(value, delayMs = 300) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(t);
  }, [value, delayMs]);
  return debounced;
}
