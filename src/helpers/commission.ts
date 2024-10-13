import type { ArrayElement } from "~/types";
import { mapKeys } from "~/utils/objects";

const commissionRateToBand = [0, 10, 15, 20, 25] as const;
const bandRange = 5000 as const;

export const calculateCommissionBreakdown = (revenue: number) =>
  commissionRateToBand
    .map((commissionRate, i) => {
      // how much revenue is in the band
      // if the band is anything but the last one comapre against the band range otherwise for the last band just use whatever revenue is left
      const revenueInBand =
        i !== commissionRateToBand.length - 1
          ? revenue >= bandRange
            ? bandRange
            : revenue
          : revenue;
      // remove the amount from the total revenue for next cycle
      // biome-ignore lint/style/noParameterAssign: biome complains that we're reassigning a parameter
      revenue = revenue - revenueInBand;
      // calculate the amount in commission and assign to the band
      return { [commissionRate]: revenueInBand * (commissionRate / 100) };
    })
    // biome-ignore lint/performance/noAccumulatingSpread: biome complains that we're using a spread operator on the accumulator
    .reduce((a, v) => ({ ...a, ...v }), {}) as Record<
    ArrayElement<typeof commissionRateToBand>,
    number
  >;

// calculate total commission by mapping over calculateCommissionBreakdown return
// and adding together all the values
export const calculateCommissionTotal = (
  breakdown: ReturnType<typeof calculateCommissionBreakdown>
) =>
  mapKeys(breakdown, (_, value) => value).reduce((a, v) => {
    const sum = a + v;
    return sum;
  });

// generic function to run both of the above functions more concisely
export const calculateCommission = (revenue: number) => {
  const breakdown = calculateCommissionBreakdown(revenue);
  const total = calculateCommissionTotal(breakdown);

  return { breakdown, total };
};
