"use client";

import { type ChangeEvent, type FormEvent, useEffect, useState } from "react";
import { usePostCalculateCommission } from "~/hooks/usePostCalculateCommission";
import { revenueSchema } from "~/schemas/commission";
import { Widget, WidgetTitle } from "./Widgets";
import styled from "styled-components";
import Image from "next/image";
import { Spinner } from "./Spinner";
import { mapKeys } from "~/utils/objects";

const StyledMessage = styled.div`
  font-size: small;
  color: rgba(0, 0, 0, 0.75);
`;

const StyledData = styled.div`
  width: 100%;
  height: 100%;
`;

const StyledTotal = styled.div`
  font-size: 48px;
  font-weight: bold;
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

const Data = (
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
          <StyledMessage>Band</StyledMessage>
          <StyledMessage>Commission</StyledMessage>
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
  margin-top: 16px;
`;

const StyledResultsWrapper = styled.div`
  width: 100%;
  border: var(--border-regular);
  border-radius: 4px;
  padding: 8px 16px;
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

const StyledSpinner = styled(Spinner)`
  width: 32px;
  height: 32px;
`;

const StyledError = styled.div`
  color: var(--brand-color-red);
  font-size: small;
  font-weight: bold;
  margin-top: 8px;
`;

export const CommissionWidget = () => {
  const [inputs, setInputs] = useState({ revenue: "" });
  const [revenue, setRevenue] = useState<number>();
  const [error, setError] = useState<string>();

  const {
    data,
    error: apiError,
    isLoading,
  } = usePostCalculateCommission(revenue);

  useEffect(() => {
    // if we get an api error, set it
    setError(apiError);
  }, [apiError]);

  const handleInputChange =
    (key: keyof typeof inputs) => (e: ChangeEvent<HTMLInputElement>) => {
      setInputs((inputs) => ({ ...inputs, [key]: e.target.value }));
    };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // only if we have a valid revenue input, change state
    const { success, data } = revenueSchema.safeParse(inputs.revenue);
    if (success) setRevenue(data);
    else setError("That doesn't look like a number more than one");
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
          {error && <StyledError>{error}</StyledError>}
        </StyledForm>
        <StyledResultsWrapper>
          {isLoading ? (
            <StyledSpinner />
          ) : data ? (
            <Data {...data} />
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
