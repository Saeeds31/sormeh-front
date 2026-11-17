<!-- app/components/panel/UserSidebar.vue -->
<template>
  <div class="card bg-gray-100 p-6 rounded-xl text-center">
    <div class="w-fit mx-auto flex items-center gap-2 pb-4">
      <figure
        class="w-16 h-16 rounded-full border-2 border-gray-300 bg-[#F4F9F1] flex items-center justify-center overflow-hidden shrink-0"
      >
        <img
          v-if="userProfile?.avatar"
          :src="userProfile.avatar"
          class="object-cover w-full h-full"
          alt="پروفایل کاربر"
        />
        <User v-else class="w-8 h-8 text-gray-600" />
      </figure>

      <div class="space-y-1 text-right">
        <p class="font-bold text-[#222222] text-base">
          {{ userProfile?.full_name || "کاربر" }}
        </p>
        <p
          class="text-xs text-[#888888] [direction:ltr] font-medium text-right"
        >
          {{ userProfile?.mobile }}
        </p>
      </div>
    </div>

    <NuxtLink
      to="/panel/wallet"
      class="mb-8 gap-1.5 text-sm font-bold text-strong flex items-center justify-center p-3.5 rounded-lg bg-secondary-fade border-1 !border-secondary transition-colors duration-200"
    >
      <div>
        <span>اعتبار کیف پول : </span>
      </div>

      <div>
        <span class="pl-1">
          {{ formatPrice(walletBalance) }}
        </span>
        <span class="">تومان</span>
      </div>
    </NuxtLink>

    <div class="w-full flex items-center">
      <div
        class="!h-[1.5px] flex-1 bg-gradient-to-r from-black/50 via-black/40 to-transparent"
      ></div>
      <div
        class="!h-[1.5px] flex-1 bg-gradient-to-l from-black/50 via-black/40 to-transparent"
      ></div>
    </div>

    <ul class="space-y-1.5 text-right mt-4">
      <NuxtLink
        v-for="(item, index) in menu"
        :key="index"
        :to="item.to"
        class="flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all duration-300 group text-[#555555] hover:bg-[#f2eff9] hover:text-[#222222]"
        :class="{
          '!bg-[var(--bg-secondary)] !text-[var(--text-primery)] font-medium':
            route.path === item.to,
        }"
        @click="handleMenuClick(item.to)"
      >
        <component
          :is="item.icon"
          class="w-5 h-5 transition-colors text-[#a09f9f] group-hover:text-[#222222]"
          :class="{ 'text-[#72B742]': route.path === item.to }"
        />
        <span class="text-sm font-medium">{{ item.label }}</span>
      </NuxtLink>

      <li
        class="flex items-center gap-3.5 px-4 py-3 rounded-xl cursor-pointer text-red-500 hover:bg-red-50 transition-all duration-300 mt-2"
        @click="logout"
      >
        <LogOut class="w-5 h-5 text-red-500" />
        <span class="text-sm font-medium">خروج</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { nextTick, ref, watch, computed } from "vue";
import { useApi } from "@/composables/api/useApi";
import {
  User,
  MapPin,
  ShoppingBag,
  Heart,
  Wallet,
  LogOut,
  Star,
} from "lucide-vue-next";

const route = useRoute();
const router = useRouter();
const { getWallet } = useApi();

const { data: walletData } = await useAsyncData(
  "userWallet",
  async () => {
    try {
      return await getWallet();
    } catch (error) {
      console.error("❌ Failed to fetch wallet in sidebar:", error);
      return null;
    }
  },
  {
    lazy: true,
    server: false,
  },
);

const walletBalance = computed(() => {
  return (
    walletData.value?.wallet?.balance ?? walletData.value?.data?.balance ?? 0
  );
});

const formatPrice = (value) => {
  if (value === null || value === undefined) return "۰";
  return Number(value).toLocaleString("fa-IR");
};

const pendingScroll = ref(false);

const userProfile = computed(() => {
  if (process.client) {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        return JSON.parse(userData);
      } catch (error) {
        console.error("❌ Failed to parse user data from localStorage:", error);
        return null;
      }
    }
  }
  return null;
});

const menu = [
  { label: "حساب کاربری", to: "/panel", icon: User },
  { label: "سفارش های من", to: "/panel/orders", icon: ShoppingBag },
  { label: "سرمه کلاب", to: "/panel/sormeh", icon: Star },
  { label: "کیف پول", to: "/panel/wallet", icon: Wallet },
  { label: "لیست آدرس‌ها", to: "/panel/addresses", icon: MapPin },
  { label: "لیست علاقه‌مندی‌ها", to: "/panel/favorites", icon: Heart },
];

const formatMobile = (mobile) => {
  if (!mobile) return "---";
  const mobileStr = mobile.toString();
  if (mobileStr.length >= 10) {
    return `${mobileStr.slice(0, 4)}***${mobileStr.slice(-3)}`;
  }
  return mobile;
};

const handleMenuClick = (to) => {
  if (process.client && window.innerWidth < 768) {
    if (route.path === to) {
      scrollDown();
      return;
    }
    pendingScroll.value = true;
  }
};

const scrollDown = () => {
  window.scrollBy({
    top: 150,
    behavior: "smooth",
  });
};

watch(
  () => route.path,
  async () => {
    if (!pendingScroll.value) return;
    if (!process.client || window.innerWidth >= 768) {
      pendingScroll.value = false;
      return;
    }

    await nextTick();

    setTimeout(() => {
      scrollDown();
      pendingScroll.value = false;
    }, 300);
  },
);

const logout = () => {
  router.push("/");
};
</script>
