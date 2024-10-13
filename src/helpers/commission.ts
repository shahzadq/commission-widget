import { ArrayElement } from "~/types";
import { mapKeys } from "~/utils/objects";

const commissionRateToBand = [0, 10, 15, 20, 25] as const;
const bandRange = 5000 as const;

export const calculateCommissionBreakdown = (revenue: number) =>
  commissionRateToBand
    .map((commissionRate) => {
      // how much revenue is in the band
      const revenueInBand = revenue >= bandRange ? bandRange : revenue;
      // remove the amount from the total revenue for next cycle
      revenue = revenue - revenueInBand;
      // calculate the amount in commission and assign to the band
      return { [commissionRate]: revenueInBand * (commissionRate / 100) };
    })
    .reduce((a, v) => ({ ...a, ...v }), {}) as Record<
    ArrayElement<typeof commissionRateToBand>,
    number
  >;

// calculate total commission by mapping over calculateCommissionBreakdown return
// and adding together all the values
export const calculateTotalCommission = (
  breakdown: ReturnType<typeof calculateCommissionBreakdown>
) => mapKeys(breakdown, (_, value) => value).reduce((a, v) => (a += v));

// generic function to run both of the above functions more concisely
export const calculateCommission = (revenue: number) => {
  const breakdown = calculateCommissionBreakdown(revenue);
  const total = calculateTotalCommission(breakdown);

  return { breakdown, total };
};
