import { ComponentProps } from "react";

export type InputProps = ComponentProps<"input">;

export type TSDebtCalculate = {
  debt: string;
  interestPercentage: string;
  principlePercentage: string;
  term: string;
  balance: number;
  payment: number;
};
export type TSDebt = {
  debtInformation: TSDebtCalculate | null;
  handleAnswer: () => void;
};

export type TSGetDebt = {
  getDebtInformation: (debtInformation: TSDebtCalculate) => void;
  debtInformation: TSDebtCalculate | null;
};

export type TSHandleDebt = {
  handleAnswer: (payment: number, balance: number) => void;
  debt: number;
  payment: number;
  balance: number;
};

export interface PaymentPostings {
  date: number;
  currentDate: string;
  payment: number;
  balance: number;
}
