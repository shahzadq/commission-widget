import { z } from "zod";
import { calculateCommission } from "~/helpers/commission";

const bodyValidator = z.object({
  // cant have a negative revenue
  revenue: z.number().min(0),
});

export const POST = async (req: Request) => {
  const { data } = bodyValidator.safeParse(await req.json());

  // if data is undefined, zod parsing has failed and an invalid value has reached the api for revenue so send back an error
  if (typeof data === "undefined")
    return Response.json(
      {
        type: "error",
        message: "Invalid revenue provided",
      },
      { status: 400 },
    );

  // otherwise we should be able to calculate the commission and return it to the user
  const { revenue } = data;

  return Response.json({
    type: "success",
    data: {
      commission: calculateCommission(revenue),
    },
  });
};
