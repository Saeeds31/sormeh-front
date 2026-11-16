<!-- app/components/shared/SectionSliderHeader.vue -->
<template>
  <div class="flex items-center justify-between gap-3" :class="wrapperClass">
    <!-- Title (Right in RTL layouts) -->
    <div class="flex items-center gap-3 order-1" :class="titleWrapperClass">
      <slot name="title">
        <h2
          class="text-sm md:text-2xl font-bold border-r-2 border-gray-700 pr-2 leading-none flex items-center gap-1.5"
          :class="[titleClass, titleBorderClass]"
        >
          <template v-if="resolvedSegments?.length">
            <span
              v-for="(seg, i) in resolvedSegments"
              :key="i"
              :class="seg.class"
            >
              {{ seg.text }}
            </span>
          </template>
          <template v-else-if="title">
            {{ title }}
          </template>
        </h2>
      </slot>
    </div>

    <!-- Divider -->
    <div
      class="flex-1 h-[1px] hidden sm:block order-2"
      :class="[dividerClass, dividerVisibleClass]"
    />

    <!-- Actions (Left) -->
    <div
      class="flex items-center gap-1.5 md:gap-3 order-3"
      :class="actionsClass"
    >
      <!-- لینک مشاهده همه (اگر مقداردهی شده باشد، قبل از دکمه‌های اسلایدر قرار می‌گیرد) -->
      <slot name="actions">
        <NuxtLink
          v-if="viewAllLink"
          :to="viewAllLink"
          class="flex items-center gap-1.5 text-sm md:text-base font-medium text-[#3F2356] hover:text-opacity-80 transition-colors shrink-0 hover:font-bold"
        >
          <span>{{ viewAllText }}</span>
        </NuxtLink>
      </slot>

      <!-- دکمه‌های اسلایدر (در صورت فعال بودن showArrows) -->
      <div
        v-if="showArrows"
        class="flex items-center gap-2"
        :class="arrowsWrapperClass"
      >
        <button
          type="button"
          class="w-9 h-9 rounded-lg flex items-center justify-center transition-colors cursor-pointer shadow-sm"
          :class="[buttonClass, prevButtonClass]"
          :disabled="disabled"
          :aria-label="prevLabel"
          @click="$emit('prev')"
        >
          <slot name="prevIcon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-4 h-4 stroke-current fill-none"
              viewBox="0 0 24 24"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </slot>
        </button>

        <button
          type="button"
          class="w-9 h-9 rounded-lg flex items-center justify-center transition-colors cursor-pointer shadow-sm"
          :class="[buttonClass, nextButtonClass]"
          :disabled="disabled"
          :aria-label="nextLabel"
          @click="$emit('next')"
        >
          <slot name="nextIcon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-4 h-4 stroke-current fill-none"
              viewBox="0 0 24 24"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          </slot>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

type TitleSegment = { text: string; class?: string };

const props = withDefaults(
  defineProps<{
    title?: string;
    titleSegments?: TitleSegment[];
    titleParts?: TitleSegment[];

    showArrows?: boolean;
    disabled?: boolean;

    viewAllLink?: string;
    viewAllText?: string;
    arrowsWrapperClass?: string;

    wrapperClass?: string;
    titleWrapperClass?: string;
    titleClass?: string;
    titleBorderClass?: string;
    dividerClass?: string;
    dividerVisibleClass?: string;
    actionsClass?: string;
    buttonClass?: string;
    prevButtonClass?: string;
    nextButtonClass?: string;
    prevLabel?: string;
    nextLabel?: string;
  }>(),
  {
    title: "",
    titleSegments: () => [],
    titleParts: () => [],
    showArrows: true,
    disabled: false,
    viewAllText: "مشاهده همه",
    arrowsWrapperClass: "",

    wrapperClass: "",
    titleWrapperClass: "",
    titleClass: "text-gray-900",
    titleBorderClass: "border-[#3F2356]",
    dividerClass: "bg-gray-200",
    dividerVisibleClass: "",
    actionsClass: "",
    buttonClass:
      "bg-[#EAE2F3] hover:bg-[#3F2356] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed",
    prevButtonClass: "",
    nextButtonClass: "",
    prevLabel: "Previous",
    nextLabel: "Next",
  },
);

const resolvedSegments = computed(() => {
  return props.titleSegments.length ? props.titleSegments : props.titleParts;
});

defineEmits<{
  (e: "prev"): void;
  (e: "next"): void;
}>();
</script>
