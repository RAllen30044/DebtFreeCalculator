import { useState } from "react";
import { TextInputProps } from "../TextInputProps";
import { PaymentHistory } from "../paymentHistory/PaymentHistory";
import { ErrorMessage } from "./ErrorMessage";

const preventLetterTyping = (value: string) => {
  return value.replace(/[^0-9.]/g, "");
};

export const Form = () => {
  const [debtInput, setDebtInput] = useState<string>("");
  const [interestPercentageInput, setInterestPercentageInput] =
    useState<string>("");
  const [principlePercentageInput, setPrinciplePercentageInput] =
    useState<string>("");
  const [termInMonths, setTermInMonths] = useState<string>("");
  const [termInYears, setTermInYears] = useState<string>("");
  const [payment, setPayment] = useState<number>(0);
  const [newBalance, setNewBalance] = useState<number>(0);
  const [isAnError, setIsAnError] = useState(false);
const [isSubmitted, setIsSubmitted]=useState(false)

  const debt = debtInput ? parseInt(debtInput) : 0;
  const interestPercentage = interestPercentageInput
    ? parseFloat(interestPercentageInput)
    : 0;
  const principlePercentage = principlePercentageInput
    ? parseFloat(principlePercentageInput)
    : 0;


  const months = termInMonths ? parseInt(termInMonths) : 0;
  const years = termInYears ? parseInt(termInYears) : 0;
  const interest = termInMonths
    ? debt * (interestPercentage / 10000) * months
    : debt * (interestPercentage / 10000) * (years * 12);
  const principle = debt * (principlePercentage / 100);
  const myPayment = termInMonths
    ? (interest + principle + debt) / months
    : (interest + principle + debt) / (years * 12);
  const myBalance = debt + interest;


  const isMonthOrYearInputValid = (month: number, year: number) => {
    return (month === 0 && year === 0) || (month > 1 && year > 1);
  };

  const handleAnswer: (payment: number, balance: number) => void = (
    payment: number,
    balance: number
  ) => {
    if (newBalance <= payment) {
      const finalBalance = newBalance - newBalance;
      setPayment(finalBalance);
      setNewBalance(finalBalance);
      return;
    }
    setNewBalance(balance - payment);
    if (balance - payment < payment) setPayment(balance - payment);
  };

  return (
    <>
      <form
        className="debtCalculator"
        onSubmit={(e) => {
          e.preventDefault();
          if (isMonthOrYearInputValid(months, years)) {
            setIsAnError(true);
            setIsSubmitted(false);
            return;
          }
          setIsSubmitted(true)
          setIsAnError(false);
          setInterestPercentageInput("");
          setPrinciplePercentageInput("");
          setTermInMonths("");
          setTermInYears("");
          setPayment(myPayment);
          setNewBalance(myBalance);
        }}
      >
        <div>
          <TextInputProps
            label={"Total Debt"}
            inputProps={{
              type: "text",
              value: debtInput,
              onChange: ({ target: { value } }) => {
                setDebtInput(preventLetterTyping(value));
              },
              maxLength: 9,
            }}
          />
        </div>
        <div>
          <TextInputProps
            label={"Interest rate"}
            inputProps={{
              type: "text",
              value: interestPercentageInput,
              onChange: ({ target: { value } }) => {
                setInterestPercentageInput(preventLetterTyping(value));
              },
              maxLength: 3,
            }}
          />
        </div>
        <div>
          <TextInputProps
            label={"Principle Percentage to pay?"}
            inputProps={{
              type: "text",
              value: principlePercentageInput,
              onChange: ({ target: { value } }) => {
                setPrinciplePercentageInput(preventLetterTyping(value));
              },
              maxLength: 3,
            }}
          />
        </div>
        <div>
          <TextInputProps
            label={"Term in Months"}
            inputProps={{
              type: "text",
              value: termInMonths,
              onChange: ({ target: { value } }) => {
                setTermInMonths(preventLetterTyping(value));
              },
              maxLength: 3,
            }}
          />
        </div>

        <label htmlFor="Or">Or</label>

        <br />
        <div>
          <TextInputProps
            label={"Term in Years"}
            inputProps={{
              type: "text",
              value: termInYears,
              onChange: ({ target: { value } }) => {
                setTermInYears(preventLetterTyping(value));
              },
              maxLength: 3,
            }}
          />
        </div>
        {isAnError&& <ErrorMessage />}

        <input type="submit" />
      </form>
{   isSubmitted &&   <PaymentHistory
        debt={debt}
        payment={payment}
        balance={newBalance}
        handleAnswer={handleAnswer}
      />}
    </>
  );
};
