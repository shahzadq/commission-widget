"use client";

import { type ChangeEvent, type FormEvent, useState } from "react";
import { usePostCalculateCommission } from "~/hooks/usePostCalculateCommission";
import { revenueSchema } from "~/schemas/commission";
import { Widget, WidgetTitle } from "./Widgets";
import styled from "styled-components";
import Image from "next/image";
import { Spinner } from "./Spinner";

const StyledWidgetContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media screen and (min-width: 700px) {
    flex-direction: row;
  }
`;

const StyledForm = styled.form`
  width: 100%;
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

const StyledResultsWrapper = styled.div`
  width: 100%;
  border: var(--border-regular);
  border-radius: 4px;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledNothingToShow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: center;

  img {
    width: 32px;
    height: 32px;
  }
`;

const StyledMessage = styled.div`
  font-size: small;
  color: rgba(0, 0, 0, 0.75);
`;

const StyledSpinner = styled(Spinner)`
  width: 32px;
  height: 32px;
`;

export const CommissionWidget = () => {
  const [inputs, setInputs] = useState({ revenue: "" });
  const [revenue, setRevenue] = useState<number>();

  const { data, error, isLoading } = usePostCalculateCommission(revenue);

  const handleInputChange =
    (key: keyof typeof inputs) => (e: ChangeEvent<HTMLInputElement>) => {
      setInputs((inputs) => ({ ...inputs, [key]: e.target.value }));
    };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // only if we have a valid revenue input, change state
    const { success, data } = revenueSchema.safeParse(inputs.revenue);
    if (success) setRevenue(data);
  };

  return (
    <Widget>
      <WidgetTitle>Commission Estimate</WidgetTitle>
      <StyledWidgetContent>
        <StyledForm onSubmit={handleFormSubmit}>
          <StyledLabel>Revenue Estimate</StyledLabel>
          <StyledInputWrapper>
            <StyledPreInput>£</StyledPreInput>
            <StyledInput
              type="number"
              value={inputs.revenue}
              onChange={handleInputChange("revenue")}
            />
          </StyledInputWrapper>
          <StyledButton type="submit">Estimate</StyledButton>
        </StyledForm>
        <StyledResultsWrapper>
          {isLoading ? (
            <StyledSpinner />
          ) : data ? (
            "data"
          ) : (
            <StyledNothingToShow>
              <Image
                height={48}
                width={48}
                src="https://img.icons8.com/material-outlined/4065ff/48/nothing-found.png"
                alt="nothing-found"
              />
              <StyledMessage>Nothing to show yet</StyledMessage>
            </StyledNothingToShow>
          )}
        </StyledResultsWrapper>
      </StyledWidgetContent>
    </Widget>
  );
};
