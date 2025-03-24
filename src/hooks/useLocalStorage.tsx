"use client";

import { useState, useEffect } from "react";

function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    // Initial value is set in the browser only
    if (typeof window === "undefined") {
      return initialValue;
    }

    if (typeof window !== "undefined") { 
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(`Error reading localStorage key "${key}":`, error);
            return initialValue;
        }
    }
  });

  const setValue = (value: T) => {
    try {
      // Save state
      setStoredValue(value);

      // Save to localStorage
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  // useEffect(() => {
  //   // Sync state with localStorage when the component mounts
  //   if (typeof window !== "undefined") {
  //     try {
  //       const item = window.localStorage.getItem(key);
  //       if (item) {
  //         setStoredValue(JSON.parse(item));
  //       }
  //     } catch (error) {
  //       console.error(`Error syncing localStorage key "${key}":`, error);
  //     }
  //   }
  // }, [key]);

  return [storedValue, setValue];
}

export default useLocalStorage;
