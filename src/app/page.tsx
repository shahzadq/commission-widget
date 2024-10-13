"use client";

import styled from "styled-components";
import {
  ApiCommissionWidget,
  ServerActionCommissionWidget,
} from "~/components/CommissionWidgets";
import { media } from "~/constants";

const StyledWrapper = styled.section`
  height: 100%;

  @media ${media.isNotMobile} {
    display: grid;
    grid-template-rows: repeat(2, minmax(100%, 1fr));
  }
`;

const StyledGridRow = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justiyf-content: center;
  border: rgba(0, 0, 0, 0.1);
`;

export default function Home() {
  return (
    <StyledWrapper>
      <StyledGridRow>
        <ApiCommissionWidget />
      </StyledGridRow>
      <StyledGridRow>
        <ServerActionCommissionWidget />
      </StyledGridRow>
    </StyledWrapper>
  );
}
