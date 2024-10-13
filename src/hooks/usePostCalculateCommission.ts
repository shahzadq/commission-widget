"use client";

// hook to implement api fetch and parsing whatever response comes back

import { useEffect, useState, useCallback } from "react";
import type { calculateCommission } from "~/helpers/commission";

export const usePostCalculateCommission = (revenue?: number) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [data, setData] = useState<ReturnType<typeof calculateCommission>>();

  // we need this function to be seperate from useEffect becuase you cant have an async useeffect callback
  const handleFetch = useCallback(async () => {
    setIsLoading(true);

    try {
      const res = await fetch("/api/calculate-commission", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ revenue }),
      });

      const data = await res.json();

      if (data.type === "error") setError(data.message);
      else setData(data.commission);
    } catch {
      setError("Something went wrong. Try reloading this page.");
    }

    setIsLoading(false);
  }, [revenue]);

  useEffect(() => {
    if (typeof revenue !== "undefined") {
      handleFetch();
    }
  }, [revenue, handleFetch]);

  return { isLoading, error, data };
};
