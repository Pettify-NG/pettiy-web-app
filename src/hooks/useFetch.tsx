import { useEffect, useState, useCallback } from "react";

interface UseFetchProps<T> {
    data: T | null,
    error: string | null,
    refetch: () => void,
    isLoading: boolean
}

const useFetch = <T,> (url: string, options?: RequestInit): UseFetchProps<T> => {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fetchData = useCallback(async () => {
        setError(null);
        setIsLoading(true);

        try {
            const response = await fetch(url, {
                ...options,
                headers: {
                    "Content": "application/json",
                    ...options?.headers
                }
            });

            if(!response.ok) {
                throw new Error(`HTTP ERROR. Status: ${response.status}`);
            }

            const result = await response.json();
            setData(result.data);
        } catch(error: any) {
            setError(error.message || "Something went wrong.");
        } finally {
            setIsLoading(false);
        }
    }, [url, options]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, error, isLoading, refetch: fetchData}
}

export default useFetch;