<script lang="ts" setup>
import { computed } from 'vue';
import { useMortgageStore } from '../store/mortgage';
import { formatCurrency, formatPercentage } from '../utils/formatter';

const mortgageStore = useMortgageStore();

const ratesData = computed(() => {
  if (!mortgageStore.ratesTableData?.root?.ratesTable) {
    return [];
  }
  
  const ratesTable = mortgageStore.ratesTableData.root.ratesTable;
  return Object.entries(ratesTable).map(([years, data]) => ({
    years: parseInt(years),
    borrowingRate: data.borrowingRate,
    monthlyRate: data.monthlyRate
  }));
});
</script>
<template>
  <div class="bg-gray-100 rounded-xl p-6 border border-gray-200">
    <div class="mb-6">
      <h3 class="text-lg font-medium text-gray-900 mb-1">Interest Rate Comparison</h3>
    </div>
    
    <div v-if="mortgageStore.isLoading" class="text-center py-8">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600 mx-auto"></div>
      <p class="text-gray-600 mt-2">Loading rates</p>
    </div>
        <div v-if="mortgageStore.isQueryError" class="text-center py-8">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600 mx-auto"></div>
      <p class="text-red-600 mt-2">Error loading rates. Please try again later.</p>
    </div>
    <div v-else-if="!mortgageStore.isReadyToShowRatesTable || ratesData.length === 0" class="text-center py-8">
      <p class="text-gray-600">Calculate to see results </p>
    </div>
    <div v-else class="space-y-4">
      <div
        v-for="rate in ratesData"
        :key="rate.years"
        class="bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow duration-200"
      >
        <div class="flex items-center justify-between mb-3">
          <h4 class="text-lg font-semibold text-gray-900">{{ rate.years }} years</h4>
          <div>
            <span class="inline-block text-sm text-gray-600 mr-2">Interest Rate</span>
            <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
              {{ formatPercentage(rate.borrowingRate) }}
            </span>
          </div>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-sm text-gray-600">Monthly Payment</span>
          <span class="text-lg font-semibold text-teal-700">{{ formatCurrency(rate.monthlyRate) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>