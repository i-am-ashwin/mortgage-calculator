export interface RatesTableParams {
  propertyPrice: number
  repaymentRate: number
  impliedLoanAmount: number
}
export interface RatesTableResponse {
  root: {
    ratesTable: {
        [years: string]: {
            borrowingRate: number
            monthlyRate: number
        }
    }
  }
}
export interface MortgageFormData {
  propertyPrice: number | null;
  totalSavings: number | null;
  realEstateCommission: boolean;
  repaymentRate: number | null;
}