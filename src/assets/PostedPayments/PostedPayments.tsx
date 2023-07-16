import "./PostedPayments.css";
import { PaymentPostings } from "../../types";

export const PostedPayments = ({
  paymentPostings,
}: {
  paymentPostings: PaymentPostings[];
}) => {
  return (
    <>
      <ul className="paymentPosting">
        {paymentPostings.map((posting) => {
          return (
            <li key={posting.date}>
              <p>Date: {posting.currentDate}</p>
              <p>Payment: {posting.payment}</p>
              <p>Remaning Balance: {posting.balance}</p>
            </li>
          );
        })}
      </ul>
    </>
  );
};
