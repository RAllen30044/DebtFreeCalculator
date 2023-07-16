import { useState } from "react";
import { TextInputProps } from "../TextInputProps";
import { PaymentHistory } from "../paymentHistory/PaymentHistory";

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

  const debt = debtInput ? parseInt(debtInput) : 0;
  const interestPercentage = interestPercentageInput
    ? parseFloat(interestPercentageInput)
    : 0;
  const principlePercentage = principlePercentageInput
    ? parseFloat(principlePercentageInput)
    : 0;

  const interest = debt * (interestPercentage / 10000) * parseInt(termInMonths);
  const principle = debt * (principlePercentage / 100);
  const myPayment = (interest + principle + debt) / parseInt(termInMonths);
  const myBalance = debt + interest - principle;
  const handleAnswer: (payment: number, balance: number) => void = (
    payment: number,
    balance: number
  ) => {

    if (newBalance <= payment) {
      const lastPayment = newBalance;
      setPayment(lastPayment)
      setNewBalance(newBalance - lastPayment);
      return;
    }
    setNewBalance(balance - payment);
  };
  return (
    <>
      <form
        className="debtCalculator"
        onSubmit={(e) => {
          e.preventDefault();

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

        <input type="submit" />
      </form>
      <PaymentHistory
        debt={debt}
        payment={payment}
        balance={newBalance}
        handleAnswer={handleAnswer}
      />
    </>
  );
};
