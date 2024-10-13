import { z } from "zod";

// cant have a negative revenue
export const revenueSchema = z.number().min(0);
