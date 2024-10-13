"use client";

import type { ComponentProps } from "react";
import styled from "styled-components";
import { Icon } from "./Icon";

const StyledSpinner = styled(Icon)`
  animation: spin 1s linear infinite;
`;

export const Spinner = (
  props: Omit<ComponentProps<typeof StyledSpinner>, "name" | "alt" | "color">
) => (
  <StyledSpinner
    name="iphone-spinner--v2"
    color="4065ff"
    alt="spinner-icon"
    {...props}
  />
);
