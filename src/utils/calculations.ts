import { BROKER_FEE_PERCENTAGE, CITY_TAX_PERCENTAGE } from "./constants";

const calculateNotaryFees = (propertyPrice: number): number => {
  return 2144.0 + (0.013 * propertyPrice - 100000);
};
const calculateBrokerFees = (propertyPrice: number): number => {
  return propertyPrice * BROKER_FEE_PERCENTAGE;
};
const calculateStampDuty = (propertyPrice: number): number => {
  return propertyPrice * CITY_TAX_PERCENTAGE;
};

const totalCosts = (propertyPrice: number, realEstateCommision: boolean): number => {
  return (
    calculateNotaryFees(propertyPrice) +
    calculateStampDuty(propertyPrice) +
    (realEstateCommision ? calculateBrokerFees(propertyPrice) : 0)
  );
};

export const calculateImpliedLoan = (propertyPrice: number, totalSavings: number, realEstateCommision: boolean): number => {
  const total = totalCosts(propertyPrice, realEstateCommision);
  return propertyPrice + total - totalSavings;
};

export const loanToValueRatio = (propertyPrice: number, totalSavings: number, realEstateCommision: boolean): number => {
  const impliedLoanAmount = calculateImpliedLoan(propertyPrice, totalSavings, realEstateCommision);
  return (impliedLoanAmount / propertyPrice) * 100;
};