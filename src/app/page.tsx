"use client";

import styled from "styled-components";
import { CommissionWidget } from "~/components/CommissionWidget";

const StyledWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function Home() {
  return (
    <StyledWrapper>
      <CommissionWidget />
    </StyledWrapper>
  );
}
