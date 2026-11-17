<!-- app/pages/panel/index.vue -->
<template>
  <div>
    <div
      class="mb-4 flex items-center justify-between gap-4 rounded-xl bg-[#eff9d9] px-4 pb-4"
    >
      <div class="text-right">
        <p class="flex items-center gap-1 text-sm font-bold">
          <span class="text-red-600">۸ سکه </span>هدیه در انتظار شماست!
          <span><Coin class="w-5 mb-1" /></span>
        </p>
        <p class="text-xs text-gray-600">
          پروفایل خود را تکمیل کنید و سکه هدیه‌تان را دریافت کنید.
        </p>
      </div>

      <button
        type="button"
        class="shrink-0 rounded-lg bg-[#719b3f] px-4 py-2 text-xs text-white"
        @click="showModal = true"
      >
        تکمیل پروفایل
      </button>
    </div>
    <div class="card bg-gray-50 p-8 rounded-xl">
      <div class="flex items-center justify-between border-b pb-5">
        <h2 class="font-bold text-xl">اطلاعات کاربری</h2>
        <!-- دکمه ویرایش -->
        <div v-if="profileData">
          <button class="btn" @click="showModal = true">ویرایش</button>

          <!-- مودال -->
          <panelEditUserModal
            :show="showModal"
            :userData="profileData?.user"
            @close="showModal = false"
            @save="handleSave"
          />
        </div>
      </div>
      <div v-if="profilePending" class="text-center py-10">
        <SharedLoadingSpinner size="lg" />
      </div>

      <div
        v-else-if="profileData"
        class="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm py-8"
      >
        <div class="flex flex-col gap-2">
          <span class="text-lg">نام و نام خانوادگی:</span>
          <span class="text-muted">{{
            profileData?.user?.full_name || "-"
          }}</span>
        </div>

        <div class="flex flex-col gap-2">
          <span class="text-lg">کد ملی:</span>
          <span class="text-muted">{{
            profileData?.user?.national_code || "-"
          }}</span>
        </div>

        <div class="flex flex-col gap-2">
          <span class="text-lg">ایمیل:</span>
          <span class="text-muted">{{ profileData?.user?.email || "-" }}</span>
        </div>

        <div class="flex flex-col gap-2">
          <span class="text-lg">شماره تماس:</span>
          <span class="text-muted">{{ profileData?.user?.mobile || "-" }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useApi } from "@/composables/api/useApi";
import { CoinsIcon } from "lucide-vue-next";

import { ref } from "vue";
import Coin from "~/components/icon/Coin.vue";

definePageMeta({
  layout: "panel",
  middleware: "auth",
});

const { getUserProfile } = useApi();

// دریافت اطلاعات کاربر از API
const {
  data: profileData,
  pending: profilePending,
  refresh: refreshProfile,
} = await useAsyncData(
  "userProfile",
  async () => {
    try {
      return await getUserProfile();
    } catch (error) {
      console.error("❌ Failed to fetch user profile:", error);
      return { data: null };
    }
  },
  {
    lazy: true,
    server: false,
  },
);

const showModal = ref(false);

async function handleSave() {
  // داده‌های پروفایل رو دوباره بگیر
  await refreshProfile();
}
</script>
