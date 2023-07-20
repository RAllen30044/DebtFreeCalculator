import { PaymentPostings, TSHandleDebt } from "../../types";
import { useState } from "react";
import { PostedPayments } from "../PostedPayments/PostedPayments";

export const PaymentHistory = ({
  debt,
  payment,
  balance,
  handleAnswer,
}: TSHandleDebt) => {
  const [paymentPostings, setPaymentPostings] = useState<PaymentPostings[]>([]);

  return (
    <>
      <div className="PaymentHistory">
        <h2>Payment History</h2>
        <form
          className="payments"
          onSubmit={(e) => {
            e.preventDefault();
            handleAnswer(payment, balance);
            const newPosting = {
              date: Date.now(),
              currentDate: new Date().toLocaleDateString("en-US"),
              payment: payment,
              balance: balance,
            };
            setPaymentPostings([newPosting, ...paymentPostings]);
          }}
        >
          <div>
            <label>Initial Debt: </label>
            <h3>${debt}</h3>
          </div>

          <div>
            <label>Payment: </label>
            <h3>${Math.round(payment * 100) / 100}</h3>
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
              <label>
                (selecting Pay will not allow you to restart unless you resubmit
                a new form)
              </label>
              <br />
              {paymentPostings.length === 0 ? (
                <div>
                  <button type="submit">Pay</button>
                  <button type="reset">Restart</button>
                </div>
              ) : (
                <button type="submit">Pay</button>
              )}
            </div>
          )}
        </form>
      </div>
      <PostedPayments paymentPostings={paymentPostings} />
    </>
  );
};
