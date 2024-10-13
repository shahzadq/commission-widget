"use client";

import { type FormEvent, useState } from "react";
import { usePostCalculateCommission } from "~/hooks/usePostCalculateCommission";
import { revenueSchema } from "~/schemas/commission";

export const Widget = () => {
  const [inputs, setInputs] = useState({ revenue: "" });
  const [revenue, setRevenue] = useState<number>();

  const { data, error, isLoading } = usePostCalculateCommission(revenue);

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // only if we have a valid revenue input, change state
    const { success, data } = revenueSchema.safeParse(inputs.revenue);
    if (success) setRevenue(data);
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <input
          type="number"
          value={inputs.revenue}
          onChange={(e) => {
            setInputs((inputs) => ({ ...inputs, revenue: e.target.value }));
          }}
        />
        <button type="submit">Calculate Commission</button>
      </form>
      <div>
        {isLoading && "loading..."}
        {error && error}
        {data && JSON.stringify(data)}
      </div>
    </div>
  );
};
