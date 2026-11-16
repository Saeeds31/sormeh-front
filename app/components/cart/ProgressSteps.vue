<!-- components/cart/ProgressSteps.vue -->
<template>
  <div class="flex justify-center items-center mb-4 md:mb-8 flex-wrap">
    <div class="flex items-center gap-3 md:gap-4">
      <!-- Step 1 -->
      <div class="flex flex-col md:flex-row items-center gap-1 md:gap-2">
        <div class="scale-90 md:scale-100">
          <IconBagActive class="w-7 h-7 md:w-6 md:h-6" />
        </div>

        <span
          class="hidden md:inline text-xs md:text-base font-bold transition-all"
          :class="currentStep >= 1 ? 'text-strong' : 'text-muted'"
        >
          سبد خرید شما
        </span>
      </div>

      <!-- Line 1 -->
      <div
        class="w-24 sm:w-16 md:w-28 border-t-dash transition-all"
        :class="currentStep >= 2 ? 'bg-secondary' : 'bg-accent'"
      ></div>

      <!-- Step 2 -->
      <div class="flex items-center gap-1 flex-col md:flex-row md:gap-2">
        <div class="scale-90 md:scale-100">
          <IconLocationActive
            class="w-7 h-7 md:w-6 md:h-6"
            v-if="currentStep >= 2"
          />
          <IconLocation class="w-6 h-6 md:w-6 md:h-6" v-else />
        </div>

        <span
          class="hidden md:inline text-xs md:text-base transition-all"
          :class="currentStep >= 2 ? 'text-strong font-bold' : 'text-muted'"
        >
          اطلاعات ارسال
        </span>
      </div>

      <!-- Line 2 -->
      <div
        class="w-24 sm:w-16 md:w-28 border-t-dash transition-all"
        :class="currentStep > 2 ? 'bg-secondary' : 'bg-accent'"
      ></div>

      <!-- Step 3 -->
      <div class="flex items-center gap-1 md:gap-2 flex-col md:flex-row">
        <div class="scale-90 md:scale-100">
          <IconPaymentActive
            class="w-7 h-7 md:w-6 md:h-6"
            v-if="currentStep >= 3"
          />
          <IconPayment class="w-6 h-6 md:w-6 md:h-6" v-else />
        </div>

        <span
          class="hidden md:inline text-xs md:text-base transition-all"
          :class="currentStep >= 3 ? 'text-strong font-bold' : 'text-muted'"
        >
          اطلاعات پرداخت
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  currentStep: {
    type: Number,
    required: true,
    validator: (value) => value >= 1 && value <= 3,
  },
});
</script>

<style scoped>
.border-t-dash {
  border-top: 1px dashed var(--text-muted);
}

.border-gray {
  border-color: var(--text-muted);
}

.border-active {
  border-color: var(var(--text-strong));
}
</style>
