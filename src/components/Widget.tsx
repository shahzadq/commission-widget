"use client";

import { useState } from "react";

export const Widget = () => {
  const [revenue, setRevenue] = useState("");

  return (
    <div>
      <form>
        <input
          type="number"
          value={revenue}
          onChange={(e) => {
            setRevenue(e.target.value);
          }}
        />
        <button type="submit">Calculate Commission</button>
      </form>
    </div>
  );
};
