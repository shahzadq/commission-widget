"use client";

import type { ComponentProps } from "react";
import { styled } from "styled-components";

const StyledWrapper = styled.div`
  padding: 12px 24px;
  border-radius: 8px;
  border: var(--border-regular);
  background-color: #fff;
`;

// should really use HTMLDivElement for prop types and wrap in a forwardRef but styled components doesnt like it
export const Widget = (props: ComponentProps<typeof StyledWrapper>) => (
  <StyledWrapper {...props} />
);
