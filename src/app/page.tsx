import { Widget } from "~/components/Widget";
import {
  calculateCommissionBreakdown,
  calculateTotalCommission,
} from "~/helpers/commission";

const a = calculateCommissionBreakdown(18000);
console.log({ breakdown: a, total: calculateTotalCommission(a) });

export default function Home() {
  return (
    <div>
      <Widget />
    </div>
  );
}
