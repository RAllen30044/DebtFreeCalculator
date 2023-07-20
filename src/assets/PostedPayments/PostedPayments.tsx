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
              <p>Payment: {Math.round(posting.payment*100)/100}</p>
              <p>Remaning Balance: {Math.round((posting.balance-posting.payment)*100)/100}</p>
            </li>
          );
        })}
      </ul>
 
    </>
  );
};
