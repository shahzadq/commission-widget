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
    display: flex;
    flex-direction: column;
  }
`;

const StyledGridRow = styled.div`
  position: relative;
  padding: 48px 0;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(0, 0, 0, 0.1);

  @media ${media.isNotMobile} {
    height: 50%;
  }
`;

const StyledTitle = styled.div`
  position: absolute;
  top: 8px;
  left: 8px;
  font-size: small;
  font-weight: bold;
`;

export default function Home() {
  return (
    <StyledWrapper>
      <StyledGridRow>
        <StyledTitle>Using Api Endpoint</StyledTitle>
        <ApiCommissionWidget />
      </StyledGridRow>
      <StyledGridRow>
        <StyledTitle>Using Server Action</StyledTitle>
        <ServerActionCommissionWidget />
      </StyledGridRow>
    </StyledWrapper>
  );
}
