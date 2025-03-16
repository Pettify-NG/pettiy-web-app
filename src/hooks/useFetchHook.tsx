import { useState, useEffect, useCallback } from "react";

type FetchOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  headers?: Record<string, string>;
  body?: any;
};

type FetchState<T> = {
  data: T | null;
  error: Error | null;
  loading: boolean;
};

function useFetchHook<T = unknown>(
  initialUrl: string | null = null,
  initialOptions?: FetchOptions
): {
  data: T | null;
  error: Error | null;
  loading: boolean;
  fetchData: (url?: string, options?: FetchOptions) => Promise<void>;
} {
  const [url, setUrl] = useState<string | null>(initialUrl);
  const [options, setOptions] = useState<FetchOptions | undefined>(
    initialOptions
  );
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    error: null,
    loading: false,
  });

  const fetchData = useCallback(
    async (overrideUrl?: string, overrideOptions?: FetchOptions): Promise<void> => {
      const finalUrl = overrideUrl || url;
      const finalOptions = { ...options, ...overrideOptions };

      if (!finalUrl) return; // Skip if no URL is provided

      setState((prev) => ({ ...prev, loading: true }));

      try {
        const response = await fetch(finalUrl, {
          method: finalOptions.method || "GET",
          headers: {
            "Content-Type": "application/json",
            ...(finalOptions.headers || {}),
          },
          body: finalOptions.body ? JSON.stringify(finalOptions.body) : undefined,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        setState({ data: result, error: null, loading: false });
      } catch (error) {
        setState({ data: null, error: error as Error, loading: false });
      }
    },
    [url, options]
  );

  useEffect(() => {
    if (url) {
      fetchData();
    }
  }, [url, fetchData]);

  return {
    data: state.data,
    error: state.error,
    loading: state.loading,
    fetchData: (newUrl, newOptions) => {
      setUrl(newUrl || url);
      setOptions(newOptions || options);
      return fetchData(newUrl, newOptions);
    },
  };
}

export default useFetchHook;
