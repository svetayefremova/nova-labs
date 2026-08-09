import { useEffect, useState } from 'react';

interface Session {
  isLoading: boolean;
  isAuthenticated: boolean;
}

export function useSession(): Session {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: replace with real auth/session check
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  return { isLoading, isAuthenticated: false };
}
