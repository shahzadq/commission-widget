"use server";

import { calculateCommission } from "~/helpers/commission";

export const calculateCommissionAction = async (revenue: number) => {
  // we could use revenueSchema, but just to demonstrate another way
  if (revenue < 0)
    return { type: "error", message: "Invalid revenue provided" };

  return {
    type: "success",
    data: calculateCommission(revenue),
  };
};
