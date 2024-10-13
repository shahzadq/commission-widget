"use client";

import styled from "styled-components";
import {
  ApiCommissionWidget,
  ServerActionCommissionWidget,
} from "~/components/CommissionWidgets";

const StyledWrapper = styled.section`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function Home() {
  return (
    <StyledWrapper>
      <ApiCommissionWidget />
      <ServerActionCommissionWidget />
    </StyledWrapper>
  );
}
