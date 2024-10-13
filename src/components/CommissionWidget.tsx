"use client";

import { type FormEvent, useState } from "react";
import { usePostCalculateCommission } from "~/hooks/usePostCalculateCommission";
import { revenueSchema } from "~/schemas/commission";
import { Widget, WidgetTitle } from "./Widgets";
import styled from "styled-components";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const StyledLabel = styled.label`
  font-size: small;
  color: rgba(0, 0, 0, 0.75);
  margin-bottom: 2px;
`;

const StyledInputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border: var(--border-regular);
  padding: 4px 8px;
  border-radius: 4px;
  gap: 4px;
  transition: all ease-in-out 0.2s;

  &:focus-within {
    border-color: rgba(0, 0, 0, 0.5);
  }
`;

const StyledPreInput = styled.div`
  color: rgba(0, 0, 0, 0.75);
  font-weight: bold;
`;

const StyledInput = styled.input`
  width: 100%;
  border: none;
  font-weight: bold;

  &:focus-visible {
    outline: none;
  }
`;

const StyledButton = styled.button`
  margin-top: 8px;
`;

export const CommissionWidget = () => {
  const [inputs, setInputs] = useState({ revenue: "" });
  const [revenue, setRevenue] = useState<number>();

  const { data, error, isLoading } = usePostCalculateCommission(revenue);

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // only if we have a valid revenue input, change state
    const { success, data } = revenueSchema.safeParse(inputs.revenue);
    if (success) setRevenue(data);
  };

  return (
    <Widget>
      <WidgetTitle>Commission Estimate</WidgetTitle>
      <StyledForm onSubmit={handleFormSubmit}>
        <StyledLabel>Revenue Estimate</StyledLabel>
        <StyledInputWrapper>
          <StyledPreInput>£</StyledPreInput>
          <StyledInput
            type="number"
            value={inputs.revenue}
            onChange={(e) => {
              setInputs((inputs) => ({ ...inputs, revenue: e.target.value }));
            }}
          />
        </StyledInputWrapper>
        <StyledButton type="submit">Calculate Commission</StyledButton>
      </StyledForm>
      <div>
        {isLoading && "loading..."}
        {error && error}
        {data && JSON.stringify(data)}
      </div>
    </Widget>
  );
};
