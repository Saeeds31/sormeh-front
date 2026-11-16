<!-- app/components/shared/MobileBottomNav.vue -->
<template>
  <nav
    aria-label="ناوبری اصلی موبایل"
    dir="rtl"
    class="fixed z-40 flex items-center justify-between md:hidden right-[max(16px,env(safe-area-inset-right))] left-[max(16px,env(safe-area-inset-left))] bottom-[max(12px,env(safe-area-inset-bottom))] gap-1"
  >
    <div
      class="flex flex-1 items-center text-[#a3a0a5] justify-around min-h-[70px] rounded-full border border-gray-200 bg-white px-2 shadow-[0_4px_18px_rgba(0,0,0,0.08),0_1px_4px_rgba(0,0,0,0.05)]"
    >
      <NuxtLink
        v-for="item in mainItems"
        :key="item.label"
        :to="item.to"
        class="flex flex-1 min-w-0 flex-col items-center justify-center gap-1 text-[#a3a0a5] no-underline [webkit-tap-highlight-color:transparent]"
        :class="{ '!text-[#4b3073]': isActive(item) }"
        :aria-current="isActive(item) ? 'page' : undefined"
      >
        <span
          class="flex h-[25px] w-[25px] items-center justify-center"
          aria-hidden="true"
        >
          <svg
            v-if="item.icon === 'home'"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="block h-[23px] w-[23px]"
          >
            <path
              d="M3.5 10.7 12 3.8l8.5 6.9v9.1a1.7 1.7 0 0 1-1.7 1.7h-4.4v-6.1H9.6v6.1H5.2a1.7 1.7 0 0 1-1.7-1.7z"
            />
          </svg>

          <svg
            v-else-if="item.icon === 'store'"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.7"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="block h-[23px] w-[23px]"
          >
            <path
              d="M4 10v9.2A1.8 1.8 0 0 0 5.8 21h12.4a1.8 1.8 0 0 0 1.8-1.8V10"
            />
            <path d="m3 9 1.4-5h15.2L21 9" />
            <path d="M3 9a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0" />
            <path d="M9 21v-6h6v6" />
          </svg>

          <span
            v-else-if="item.icon === 'sormeh-club'"
            class="flex h-[23px] w-[23px] items-center justify-center"
          >
            <img
              src="/icons/sormehClub.svg"
              alt="سرمه کلاب"
              class="h-full w-full object-contain"
            />
          </span>

          <svg
            v-else-if="item.icon === 'profile'"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.7"
            stroke-linecap="round"
            class="block h-[23px] w-[23px]"
          >
            <circle cx="12" cy="7.5" r="3.5" />
            <path d="M4.7 21a7.3 7.3 0 0 1 14.6 0" />
          </svg>
        </span>

        <span
          class="max-w-full overflow-hidden whitespace-nowrap text-xs leading-[1.3]"
        >
          {{ item.label }}
        </span>
      </NuxtLink>
    </div>

    <NuxtLink
      v-if="categoryItem"
      :to="categoryItem.to"
      class="flex flex-none flex-col items-center justify-center w-[76px] min-h-[70px] rounded-full gap-[3px] bg-white border border-gray-200 text-[#a3a0a5] transition-all duration-200 ease-in-out [webkit-tap-highlight-color:transparent]"
      :class="{ '!text-[#4b3073]': isActive(categoryItem) }"
      :aria-current="isActive(categoryItem) ? 'page' : undefined"
    >
      <span
        class="flex h-[25px] w-[25px] items-center justify-center"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.7"
          class="block h-[23px] w-[23px]"
        >
          <rect x="4" y="4" width="6" height="6" rx="2" />
          <rect x="14" y="4" width="6" height="6" rx="2" />
          <rect x="4" y="14" width="6" height="6" rx="2" />
          <rect x="14" y="14" width="6" height="6" rx="2" />
        </svg>
      </span>

      <span
        class="max-w-full overflow-hidden whitespace-nowrap text-xs leading-[1.3]"
      >
        {{ categoryItem.label }}
      </span>
    </NuxtLink>
  </nav>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const items = [
  { label: "خانه", to: "/", icon: "home", match: ["/"] },
  { label: "فروشگاه", to: "/products", icon: "store", match: ["/shop"] },
  {
    label: "باشگاه",
    to: "/panel/sormeh",
    icon: "sormeh-club",
    match: ["/panel/sormeh"],
  },
  { label: "پروفایل", to: "/panel", icon: "profile", match: ["/panel"] },
  {
    label: "دسته‌بندی",
    to: "/categories",
    icon: "categories",
    match: ["/categories"],
  },
];

const mainItems = computed(() => items.filter((i) => i.icon !== "categories"));
const categoryItem = computed(() => items.find((i) => i.icon === "categories"));

function isActive(item) {
  return item.match.some((path) =>
    path === "/" ? route.path === "/" : route.path.startsWith(path),
  );
}
</script>
