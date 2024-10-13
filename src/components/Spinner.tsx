"use client";

import Image from "next/image";
import type { ComponentProps } from "react";
import styled from "styled-components";

const StyledSpinner = styled(Image)`
  animation: spin 1s linear infinite;
`;

export const Spinner = (
  props: Omit<
    ComponentProps<typeof StyledSpinner>,
    "src" | "alt" | "width" | "height"
  >
) => (
  <StyledSpinner
    width={48}
    height={48}
    src="https://img.icons8.com/material/4065ff/48/iphone-spinner--v2.png"
    alt="loading"
    {...props}
  />
);
