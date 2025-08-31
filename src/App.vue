<script setup lang="ts">
import MortgageForm from './components/MortgageForm.vue';
import MortgageResult from './components/MortgageResult.vue';

</script>

<template>
<div class="min-h-screen bg-blue-50">
   <div class="container mx-auto">
  <div class="flex flex-col md:flex-row gap-8 max-w-7xl mx-auto items-start">
    <div class="w-full lg:w-1/2">
      <MortgageForm 
      />
    </div>
    <div class="w-full lg:w-1/2">
      <MortgageResult 
      />
    </div>
  </div>
</div>
</div>
</template>

