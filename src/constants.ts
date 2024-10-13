import { mq } from "ts-mq";

// thought i'd throw in my own package 😂... should be newer version of this coming out soon (check out the @dotts repo on my GitHub if you're interested)
export const media = {
  isNotMobile: mq({ type: "screen", minWidth: 700 }),
} as const;

// in production use the vercel auto generated url base
// https://vercel.com/docs/projects/environment-variables/framework-environment-variables
export const urlBase =
  process.env.NODE_ENV === "development"
    ? ("http://localhost:3000" as const)
    : (`https://${process.env.NEXT_PUBLIC_VERCEL_URL}` as const);
