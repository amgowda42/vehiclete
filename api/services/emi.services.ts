export const calculateEmi = (
  price: number,
  downPayment: number,
  interestRate: number,
  tenureMonths: number
) => {
  const principal = price - downPayment;
  const monthlyRate = interestRate / 12 / 100;

  const emi =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
    (Math.pow(1 + monthlyRate, tenureMonths) - 1);

  const totalPayable = emi * tenureMonths;
  const totalInterest = totalPayable - principal;

  return {
    monthlyEmi: Math.round(emi),
    totalInterest: Math.round(totalInterest),
    totalPayable: Math.round(totalPayable),
  };
};
