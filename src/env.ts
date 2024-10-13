import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  client: {
    NEXT_PUBLIC_URL_BASE: z.string().url(),
  },
  runtimeEnv: {
    NEXT_PUBLIC_URL_BASE: process.env.NEXT_PUBLIC_URL_BASE,
  },
});
