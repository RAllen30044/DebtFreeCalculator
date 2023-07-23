import { PaymentPostings, TSHandleDebt } from "../../types";
import { useState } from "react";
import { PostedPayments } from "../PostedPayments/PostedPayments";
import { TextInputProps } from "../TextInputProps";

export const PaymentHistory = ({
  payment,
  balance,
  handleAnswer,
  handleReset,
}: TSHandleDebt) => {
  const [paymentPostings, setPaymentPostings] = useState<PaymentPostings[]>([]);
  const [paymentInput, setPaymentInput] = useState<string>("");
  const myPayment = parseInt(paymentInput);
  return (
    <>
      <div className="PaymentHistory">
        <h2>Payment History</h2>
        <form
          className="payments"
          onSubmit={(e) => {
            e.preventDefault();
            const toBePaid = myPayment > payment ? myPayment : payment;
            console.log(toBePaid);
            handleAnswer(toBePaid, balance);
            const newPosting = {
              date: Date.now(),
              currentDate: new Date().toLocaleDateString("en-US"),
              payment: payment,
              balance: balance,
            };
            setPaymentPostings([newPosting, ...paymentPostings]);
          }}
          onReset={(e) => {
            e.preventDefault();
            handleReset(false);
          }}
        >
          <div>
            <TextInputProps
              label="Enter your payment amount"
              inputProps={{
                type: "text",
                onChange: ({ target: { value } }) => {
                  setPaymentInput(value);
                },
              }}
            />
          </div>

          <div>
            <label>Payment: </label>

            <h3>{Math.round(payment * 100) / 100}</h3>
          </div>
          <div>
            <label>Balance left on Debt </label>
            <h3>${Math.round(balance * 100) / 100}</h3>
          </div>

          {balance === 0 ? (
            ""
          ) : (
            <div>
              <label htmlFor="">
                Are you ready to proceed with your with tracking your debt
                repayment history?
              </label>
              <br />
              <label>Click Resart to start a new form</label>
              <br />

              <button type="submit">Pay</button>
              <button type="reset">Restart</button>
            </div>
          )}
        </form>
      </div>
      <PostedPayments paymentPostings={paymentPostings} />
    </>
  );
};
