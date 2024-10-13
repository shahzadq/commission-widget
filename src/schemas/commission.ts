import { z } from "zod";

// cant have a negative revenue
export const revenueSchema = z.coerce.number().min(0);
