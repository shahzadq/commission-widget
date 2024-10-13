"use client";

// hook to implement api fetch and parsing whatever response comes back

import { useState } from "react";
import type { calculateCommission } from "~/helpers/commission";

export const usePostCalculateCommission = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [data, setData] = useState<ReturnType<typeof calculateCommission>>();

  return {};
};
