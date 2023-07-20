export const debt = (debtInput: string) => {
  return debtInput ? parseInt(debtInput) : 0;
};

export const interestPercentage = (interestPercentageInput: string) => {
  return interestPercentageInput ? parseFloat(interestPercentageInput) : 0;
};
export const principlePercentage = (principlePercentageInput: string) => {
  return principlePercentageInput ? parseFloat(principlePercentageInput) : 0;
};

export const months = (termInMonths: string) => {
  return termInMonths ? parseInt(termInMonths) : 0;
};
export const years = (termInYears: string) => {
  return termInYears ? parseInt(termInYears) : 0;
};
export const interest = (termInMonths: string, debt:number, interestPercentage: number, months: number, years:number) => {
  return termInMonths
    ? debt * (interestPercentage / 10000) * months
    : debt * (interestPercentage / 10000) * (years * 12);
};
export const principle = (debt: number, principlePercentage: number) => {
  return debt * (principlePercentage / 100);
};
export const myPayment = (termInMonths: string, interest:number, principle:number, debt: number, months: number, years: number) => {
  return termInMonths
    ? (interest + principle + debt) / months
    : (interest + principle + debt) / (years * 12);
};
export const myBalance = (debt: number, interest: number) => {
  return debt + interest;
};
