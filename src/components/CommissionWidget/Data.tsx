"use client";

import styled from "styled-components";
import type { usePostCalculateCommission } from "~/hooks/usePostCalculateCommission";
import { mapKeys } from "~/utils/objects";
import { Message } from "~/components/Message";

const StyledData = styled.div`
  width: 100%;
  height: 100%;
`;

const StyledTotal = styled.div`
  font-size: 48px;
  font-weight: bold;
  color: var(--brand-color-blue);
`;

const StyledBreakdownWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const StyledRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledBreakdown = styled(StyledRow)<{ greaterThan0: boolean }>`
  padding: 4px 8px;
  background-color: ${(props) =>
    props.greaterThan0 ? "var(--brand-color-blue)" : "rgba(0, 0, 0, 0.05)"};
  color: ${(props) => (props.greaterThan0 ? "#fff" : "#000")};
  border-radius: 4px;
`;

const StyledBreakdownHeadersWrapper = styled(StyledRow)``;

const bands = [
  "<= £5000",
  "£5000 - £10000",
  "£10000 - £15000",
  "£15000 - £20000",
  ">= £20000",
];

export const Data = (
  props: Exclude<
    ReturnType<typeof usePostCalculateCommission>["data"],
    undefined
  >
) => {
  return (
    <StyledData>
      <StyledTotal>£{props.total}</StyledTotal>
      <StyledBreakdownWrapper>
        <StyledBreakdownHeadersWrapper>
          <Message>Band</Message>
          <Message>Commission</Message>
        </StyledBreakdownHeadersWrapper>
        {mapKeys(props.breakdown, (key, value, idx) => (
          <StyledBreakdown key={key} greaterThan0={value > 0}>
            <div>{bands[idx]}</div>
            <div>£{value}</div>
          </StyledBreakdown>
        ))}
      </StyledBreakdownWrapper>
    </StyledData>
  );
};
