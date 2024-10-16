"use client";

import {
  type ChangeEvent,
  type ComponentProps,
  type FormEvent,
  useEffect,
  useState,
} from "react";
import { usePostCalculateCommission } from "~/hooks/usePostCalculateCommission";
import { revenueSchema } from "~/schemas/commission";
import { Widget, WidgetTitle } from "~/components/Widgets";
import styled from "styled-components";
import { Spinner } from "~/components/Spinner";
import { Data } from "./Data";
import { Message } from "~/components/Message";
import { calculateCommissionAction } from "~/actions/commission";
import { media } from "~/constants";
import { Icon } from "~/components/Icon";

const StyledWidgetContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: 100%;
  overflow: hidden;

  @media ${media.isNotMobile} {
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
  background-color: var(--brand-color-grey);
  border-radius: 4px;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-x: hidden;
  overflow-y: auto;
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

const CommissionWidget = (props: {
  isLoading: boolean;
  error?: string;
  data?: ComponentProps<typeof Data>;
  onFormSubmit: (revenue: number) => void;
}) => {
  const [inputs, setInputs] = useState({ revenue: "" });
  // allow us to manipulate values locally if needed
  const [error, setError] = useState(props.error);
  const [data, setData] = useState(props.data);

  useEffect(() => {
    // when the passed error changes, update it locally
    setError(props.error);
  }, [props.error]);

  useEffect(() => {
    // when the data in props update, update it locally
    setData(props.data);
  }, [props.data]);

  const handleInputChange =
    (key: keyof typeof inputs) => (e: ChangeEvent<HTMLInputElement>) => {
      setInputs((inputs) => ({ ...inputs, [key]: e.target.value }));
    };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // only if we have a valid revenue input, change state
    const { success, data } = revenueSchema.safeParse(inputs.revenue);
    if (success) props.onFormSubmit(data);
    else {
      // reset data so the data section matches the current input state
      setData(undefined);
      setError("That doesn't look like a number more than one");
    }
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
          <StyledButton type="submit" disabled={props.isLoading}>
            {props.isLoading ? "Calculating..." : "Estimate"}
          </StyledButton>
          {error && <StyledError>{error}</StyledError>}
        </StyledForm>
        <StyledResultsWrapper>
          {props.isLoading ? (
            <StyledSpinner />
          ) : data ? (
            <Data {...data} />
          ) : (
            <StyledNothingToShow>
              <Icon
                icon="search-slash"
                style={{ color: "var(--brand-color-blue)" }}
              />
              <Message>Nothing to show yet</Message>
            </StyledNothingToShow>
          )}
        </StyledResultsWrapper>
      </StyledWidgetContent>
    </Widget>
  );
};

export const ApiCommissionWidget = () => {
  const [revenue, setRevenue] = useState<number>();

  const { data, error, isLoading } = usePostCalculateCommission(revenue);

  const handleFormSubmit = (revenue: number) => {
    setRevenue(revenue);
  };

  return (
    <CommissionWidget
      data={data}
      error={error}
      isLoading={isLoading}
      onFormSubmit={handleFormSubmit}
    />
  );
};

export const ServerActionCommissionWidget = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [data, setData] =
    useState<ComponentProps<typeof CommissionWidget>["data"]>();

  const handleFormSubmit = async (revenue: number) => {
    setIsLoading(true);
    const res = await calculateCommissionAction(revenue);
    // full type safety with actions which is nice
    if (res.type === "error") setError(res.message);
    else setData(res.data);

    setIsLoading(false);
  };

  return (
    <CommissionWidget
      isLoading={isLoading}
      error={error}
      data={data}
      onFormSubmit={handleFormSubmit}
    />
  );
};
