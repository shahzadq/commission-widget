import { mq } from "ts-mq";

// thought i'd throw in my own package 😂... should be newer version of this coming out soon (check out the @dotts repo on my GitHub if you're interested)
export const media = {
  isNotMobile: mq({ type: "screen", minWidth: 700 }),
} as const;
