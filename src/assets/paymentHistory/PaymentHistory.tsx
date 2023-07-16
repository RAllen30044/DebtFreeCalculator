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
            setPaymentPostings([...paymentPostings, newPosting]);
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
            <h3>
              $
           
                { Math.round(balance * 100) / 100}
            </h3>
          </div>

          {/* {balance === 0 ? (
            <input type="submit" disabled />
          ) : ( */}
            <input type="submit" />
          {/* )} */}
        </form>
      </div>
      <PostedPayments paymentPostings={paymentPostings} />
    </>
  );
};
