import Image from "next/image";
import type { ComponentProps } from "react";

export const Icon = ({
  name,
  ...props
}: Omit<ComponentProps<typeof Image>, "src"> & {
  color?: string;
  name: string;
}) => {
  const color = props.color || "";
  return (
    <Image
      width={48}
      height={48}
      src={`https://img.icons8.com/material${color}/48/${name}.png`}
      {...props}
    />
  );
};
