<!-- components/home/Features.vue -->
<template>
  <section class="mx-auto container">
    <div
      class="border-[2px] [border-style:dashed] border-gray-400/80 rounded-xl p-4 md:p-6"
    >
      <div class="grid grid-cols-2 md:grid-cols-4">
        <div
          v-for="(item, index) in features"
          :key="index"
          class="flex items-center justify-center p-3 sm:p-4 md:py-2 relative group"
          :class="[
            index < 2 ? 'max-md:border-b border-gray-200' : '',
            index % 2 === 0 ? 'max-md:border-l border-gray-200' : '',
            index !== features.length - 1
              ? 'md:border-l md:border-gray-200'
              : '',
          ]"
        >
          <div
            class="flex items-center gap-2 sm:gap-4 flex-row-reverse text-right"
          >
            <div class="flex flex-col select-none">
              <div
                class="text-xs sm:text-base lg:text-lg font-bold text-gray-900 leading-tight"
              >
                <span>{{ item.titleBlack }} </span>{{ "" }}
                <span class="text-[#7A0D8C]">{{ item.titlePurple }}</span>
              </div>
              <p
                class="text-[10px] sm:text-sm text-gray-400 mt-1 font-normal leading-normal"
              >
                {{ item.description }}
              </p>
            </div>
            <!-- آیکون ویژگی -->
            <div
              class="flex-shrink-0 w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center"
            >
              <img
                :src="item.icon"
                :alt="item.titleBlack + ' ' + item.titlePurple"
                class="w-full h-full object-contain"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface FeatureItem {
  titleBlack: string;
  titlePurple: string;
  description: string;
  icon: string;
}

const features: FeatureItem[] = [
  {
    titleBlack: "محصول",
    titlePurple: "اورجینال",
    description: "ضمانت اورجینال بودن",
    icon: "/icons/original.svg",
  },
  {
    titleBlack: "ارسال",
    titlePurple: "مطمئن",
    description: "بدون آسیب رساندن",
    icon: "/icons/shipping.svg",
  },
  {
    titleBlack: "پرداخت",
    titlePurple: "امن",
    description: "همه کارت های عضو شتاب",
    icon: "/icons/payment.svg",
  },
  {
    titleBlack: "پشتیبانی",
    titlePurple: "سریع",
    description: "پشتیبانی 24 ساعته",
    icon: "/icons/support.svg",
  },
];
</script>

<style scoped>
</style>
