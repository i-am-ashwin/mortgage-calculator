<template>
  <div class="bg-white rounded-2xl shadow-xl p-8 mt-8 border border-gray-100">
    <div class="mb-8">
      <h2 class="text-2xl font-semibold text-gray-900">Mortgage Calculator</h2>
    </div>
    <form class="space-y-6">
      <div class="space-y-2">
        <label for="commission" class="block text-sm font-medium text-gray-700">
          Real Estate Commission
        </label>
        <select
          id="commission"
          class="block w-full py-3 px-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
        >
          <option :value="false">No</option>
          <option :value="true">Yes</option>
        </select>
      </div>
      <div class="space-y-2">
        <label
          for="totalSavings"
          class="block text-sm font-medium text-gray-700"
        >
          Property Purchase Price *
        </label>
        <div class="relative">
          <div
            class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
          >
            <span class="text-gray-500 text-lg font-medium">€</span>
          </div>
          <input
            id="totalSavings"
            type="number"
            step="1000"
            min="0"
            required
            class="block w-full pl-10 pr-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
            placeholder="80,000"
          />
        </div>
      </div>
      <div class="space-y-2">
        <label
          for="totalSavings"
          class="block text-sm font-medium text-gray-700"
        >
          Total Savings *
        </label>
        <div class="relative">
          <div
            class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
          >
            <span class="text-gray-500 text-lg font-medium">€</span>
          </div>
          <input
            id="totalSavings"
            type="number"
            step="1000"
            min="0"
            required
            class="block w-full pl-10 pr-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
            placeholder="80,000"
          />
        </div>
      </div>
      <div class="space-y-2">
        <label
          for="repaymentRate"
          class="block text-sm font-medium text-gray-700"
        >
          Annual Repayment Rate (%) *
        </label>
        <div class="relative">
          <input
            id="repaymentRate"
            type="number"
            step="0.1"
            min="0"
            max="100"
            class="block w-full pl-4 pr-10 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
            placeholder="3.5"
          />
          <div
            class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
          >
            <span class="text-gray-500 text-lg font-medium">%</span>
          </div>
        </div>
      </div>
      <div class="pt-4 flex justify-end">
        <button
          type="submit"
          class="w-full md:w-1/2 cursor-pointer bg-teal-600 hover:bg-teal-800 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:shadow-none disabled:hover:scale-100 disabled:bg-gray-500"
        >
          <span>Calculate</span>
        </button>
      </div>
    </form>
  </div>
</template>
