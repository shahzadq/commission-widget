"use client";

import type { ComponentProps } from "react";
import styled from "styled-components";
import { Icon } from "./Icon";

const StyledSpinner = styled(Icon)`
  animation: spin 1s linear infinite;
  color: var(--brand-color-blue);
`;

export const Spinner = (
  props: Omit<ComponentProps<typeof StyledSpinner>, "icon">
) => <StyledSpinner icon="loader-circle" {...props} />;
