"use client";

import type { ComponentProps } from "react";
import { styled } from "styled-components";

const StyledWidget = styled.div`
  max-height: 100%;
  display: flex;
  flex-direction: column;
  padding: 16px 24px;
  border-radius: 8px;
  border: var(--border-regular);
  background-color: #fff;
  box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

// should really use HTMLDivElement for prop types and wrap in a forwardRef but styled components doesnt like it
// really we could just export the above StyledWidget but just to demonstrate if we wanted some general widget functionality, we could implement it in this component
export const Widget = (props: ComponentProps<typeof StyledWidget>) => (
  <StyledWidget {...props} />
);

export const WidgetTitle = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 8px;
`;
