<!-- app/components/panel/UserSidebar.vue -->
<template>
  <div class="card md:bg-gray-100 md:p-6 rounded-xl text-center">
    <div class="w-fit mx-auto flex items-center gap-2 pb-4">
      <figure
        class="w-16 h-16 rounded-full border-2 border-gray-300 bg-[#F4F9F1] flex items-center justify-center overflow-hidden shrink-0"
      >
        <img
          v-if="userAvatarUrl"
          :src="userAvatarUrl"
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

        <p
          v-if="clubPoints !== null"
          dir="rtl"
          class="flex items-center gap-1 text-xs font-bold text-[#533470]"
        >
          <img
            v-if="clubTierIcon"
            :src="clubTierIcon"
            alt=""
            class="h-4 w-4 shrink-0 object-contain"
          />

          <span>{{ formatPrice(clubPoints) }} سکه</span>
        </p>
      </div>
    </div>

    <NuxtLink
      to="/panel/wallet"
      class="mb-8 gap-1.5 text-sm font-bold text-strong flex items-center justify-center p-3.5 rounded-lg bg-secondary-fade border-1 !border-secondary transition-colors duration-200"
      @click="handleWalletClick"
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
        @click="handleMenuClick(item.to, $event)"
      >
        <component
          :is="item.icon"
          class="w-5 h-5 transition-colors text-[#a09f9f] group-hover:text-[#222222]"
          :class="{ 'text-[#72B742]': route.path === item.to }"
        />
        <span class="text-sm font-medium">{{ item.label }}</span>
      </NuxtLink>

      <li
        v-if="isLoggedIn"
        class="flex items-center gap-3.5 px-4 py-3 rounded-xl cursor-pointer text-red-500 hover:bg-red-50 transition-all duration-300 mt-2"
        @click="logout"
      >
        <LogOut class="w-5 h-5 text-red-500" />
        <span class="text-sm font-medium">خروج</span>
      </li>

      <li
        v-else
        class="flex items-center gap-3.5 px-4 py-3 rounded-xl cursor-pointer text-primary hover:bg-purple-50 transition-all duration-300 mt-2 font-bold"
        @click="openLoginModal"
      >
        <User class="w-5 h-5 text-primary" />
        <span class="text-sm">ورود / ثبت‌نام</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useApiAuth, useAuth } from "@/composables/useAuth";
import { useRoute, useRouter } from "vue-router";
import { nextTick, ref, watch, computed, onMounted } from "vue";
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
const props = defineProps({
  mobileMenu: Boolean,
});

const emit = defineEmits(["navigate"]);

// منوی موبایل حالا بیرون پنل هم باز می‌شود؛ برای مهمان کیف پول را درخواست نکن.
const canReadWallet =
  !props.mobileMenu ||
  (import.meta.client && Boolean(localStorage.getItem("auth-token")));

const route = useRoute();
const router = useRouter();
const { getWallet } = useApi();
const { $api, $getImageUrl } = useNuxtApp();
const clubPoints = ref(null);

const clubTierIcon = computed(() => {
  if (clubPoints.value === null) return "";

  const points = Number(clubPoints.value);

  if (points >= 1000) return "/icons/coinN.svg"; // پلاتینیوم
  if (points >= 500) return "/icons/coin.png"; // گلد
  return "/icons/coinB.svg"; // برنز
});

onMounted(async () => {
  if (!localStorage.getItem("auth-token")) return;

  try {
    const response = await $api.get("/front/club/summary");
    const summary = response?.data ?? response;

    clubPoints.value = summary?.total_points ?? null;
  } catch (error) {
    console.error("Failed to fetch club points in sidebar:", error);
  }
});

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
    immediate: canReadWallet,
  },
);

const walletBalance = computed(() => {
  if (!canReadWallet) return 0;

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

const userAvatarUrl = computed(() => {
  const avatar = userProfile.value?.avatar;
  if (!avatar) return "";

  // مسیر کامل را دست‌نخورده نگه می‌داریم؛ مسیر نسبی را به URL تصویر تبدیل می‌کنیم.
  return /^https?:\/\//i.test(avatar) ? avatar : $getImageUrl(avatar);
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

const handleWalletClick = (event) => {
  if (!props.mobileMenu) return;
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

  emit("navigate");
};

const handleMenuClick = (to, event) => {
  if (props.mobileMenu) {
    handleWalletClick(event);
    return;
  }

  // رفتار قبلی برای نمونه‌هایی که خارج از منوی موبایل رندر می‌شوند
  if (process.client && window.innerWidth < 768) {
    if (route.path === to) {
      scrollDown();
      return;
    }

    pendingScroll.value = true;
  }
};

// const scrollDown = () => {
//   window.scrollBy({
//     top: 150,
//     behavior: "smooth",
//   });
// };

// watch(
//   () => route.path,
//   async () => {
//     if (!pendingScroll.value) return;
//     if (!process.client || window.innerWidth >= 768) {
//       pendingScroll.value = false;
//       return;
//     }

//     await nextTick();

//     setTimeout(() => {
//       scrollDown();
//       pendingScroll.value = false;
//     }, 300);
//   },
// );

const { logout: apiLogout } = useApiAuth();
const { openModal } = useAuth();

const isLoggedIn = computed(() => {
  if (import.meta.client) {
    return Boolean(localStorage.getItem("auth-token"));
  }
  return false;
});

const openLoginModal = () => {
  if (props.mobileMenu) {
    emit("navigate");
  }
  openModal();
};
const logout = async () => {
  if (props.mobileMenu) {
    emit("navigate");
  }

  try {
    await apiLogout();
  } catch (err) {
    console.error("Logout failed:", err);
  } finally {
    if (import.meta.client) {
      localStorage.removeItem("auth-token");
      localStorage.removeItem("user");
    }

    window.location.href = "/";
  }
};
</script>
