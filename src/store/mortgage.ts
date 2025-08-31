import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { useHypofriend } from "../composables/useHypofriend";
import type {
  MortgageFormData,
  RatesTableResponse,
} from "../types/types";
import { calculateImpliedLoan, loanToValueRatio } from "../utils/calculations";

export const useMortgageStore = defineStore("mortgage", () => {
  // State
  const isReadyToShowRatesTable = ref(false);
  const isLoading = ref(false);
  const formData = ref<MortgageFormData | null>(null);
  const ratesTableData = ref<RatesTableResponse | null>(null);
  const isQueryError = ref<boolean>(false);

  // Computed values
  const impliedLoanAmount = computed(() => {
    if (!formData.value?.propertyPrice || !formData.value?.totalSavings) {
      return null;
    }
    return calculateImpliedLoan(
      formData.value.propertyPrice,
      formData.value.totalSavings,
      formData.value.realEstateCommission
    );
  });

  const loanToValue = computed(() => {
    if (!formData.value?.propertyPrice || !formData.value?.totalSavings || !impliedLoanAmount.value) {
      return null;
    }
    return loanToValueRatio(
      formData.value.propertyPrice,
      formData.value.totalSavings,
      formData.value.realEstateCommission
    );
  });

  // Composable
  const {
    fetchRatesTable,
  } = useHypofriend();

  // Action
  const updateMortgageData = (newFormData: MortgageFormData): void => {
    formData.value = { ...newFormData };
  };
  const calculateRatesTableData = async (
    formData: MortgageFormData
  ): Promise<RatesTableResponse | null> => {
    if (
      !formData.propertyPrice ||
      !formData.repaymentRate ||
      !impliedLoanAmount.value
    ) {
      return null;
    }
    isReadyToShowRatesTable.value = true;
    try {
      isLoading.value = true;

      const response = await fetchRatesTable({
        propertyPrice: formData.propertyPrice,
        repaymentRate: formData.repaymentRate,
        impliedLoanAmount: impliedLoanAmount.value,
      });
      isLoading.value = false;
      ratesTableData.value = response;
      isQueryError.value =false;
      return response;
    } catch (error) {
      isLoading.value = false;
      console.error("Error fetching rates table:", error);
      isQueryError.value = true;
      return null;
    }
  };

  return {
    isLoading,
    isReadyToShowRatesTable,
    isQueryError,
    formData,
    ratesTableData,
    impliedLoanAmount,
    loanToValue,
    updateMortgageData,
    calculateRatesTableData,
  };
});
