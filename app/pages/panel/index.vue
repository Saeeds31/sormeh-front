<!-- app/pages/panel/index.vue -->
<template>
  <div>
    <div
      class="md:mb-4 mb-2 flex items-center justify-between gap-4 rounded-xl bg-[#eff9d9] px-4 pb-4 max-md:pt-3"
    >
      <div class="text-right">
        <p class="flex items-center gap-1 text-sm font-bold">
          <span class="text-red-600">۸ سکه </span>هدیه در انتظار شماست!
          <span><Coin class="w-5 mb-1 max-md:hidden" /></span>
        </p>
        <p class="text-xs text-gray-600 max-md:pt-1">
          پروفایل خود را تکمیل کنید و سکه هدیه‌تان را دریافت کنید.
        </p>
      </div>

      <button
        type="button"
        class="shrink-0 rounded-lg bg-[#719b3f] px-1.5 md:px-4 py-2 text-xs text-white"
        @click="openBeautyModal"
      >
        تکمیل پروفایل بیوتی
      </button>
    </div>
    <div class="card rounded-xl md:bg-gray-50 md:p-8 p-2">
      <div class="flex items-center justify-between border-b pb-5">
        <h2 class="text-xl font-bold">اطلاعات کاربری</h2>

        <!-- دکمه ویرایش اطلاعات کاربری -->
        <button
          v-if="profileData"
          type="button"
          class="btn"
          @click="openUserModal"
        >
          ویرایش
        </button>
      </div>

      <div v-if="profilePending" class="py-10 text-center">
        <SharedLoadingSpinner size="lg" />
      </div>

      <div
        v-else-if="profileData"
        class="grid grid-cols-1 gap-8 py-8 text-sm md:grid-cols-3"
      >
        <div class="flex flex-col gap-2">
          <span class="text-lg">نام و نام خانوادگی:</span>
          <span class="text-muted">
            {{ profileData?.user?.full_name || "-" }}
          </span>
        </div>

        <div class="flex flex-col gap-2">
          <span class="text-lg">کد ملی:</span>
          <span class="text-muted">
            {{ profileData?.user?.national_code || "-" }}
          </span>
        </div>

        <div class="flex flex-col gap-2">
          <span class="text-lg">تاریخ تولد:</span>
          <span class="text-muted">
            {{ formatBirthDate(profileData?.user?.birth_date) }}
          </span>
        </div>

        <div class="flex flex-col gap-2">
          <span class="text-lg">شماره تماس:</span>
          <span class="text-muted">
            {{ profileData?.user?.mobile || "-" }}
          </span>
        </div>
      </div>
    </div>

    <PanelBeautyProfileModal
      :show="showBeautyModal"
      @close="closeBeautyModal"
      @saved="handleBeautySaved"
    />
    <PanelEditUserModal
      :show="showUserModal"
      :user-data="profileData?.user"
      @close="closeUserModal"
      @save="handleSave"
    />
  </div>
</template>

<script setup>
import { useApi } from "@/composables/api/useApi";
import { CoinsIcon } from "lucide-vue-next";
import { usePanelModal } from "~/composables/usePanelModal";
import { ref } from "vue";
import Coin from "~/components/icon/Coin.vue";

definePageMeta({
  layout: "panel",
  middleware: "auth",
});
const { openModal, closeModal } = usePanelModal();

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

const showUserModal = ref(false);
const showBeautyModal = ref(false);
function openUserModal() {
  showUserModal.value = true;
  openModal();
}

function closeUserModal() {
  showUserModal.value = false;

  if (!showBeautyModal.value) {
    closeModal();
  }
}

function openBeautyModal() {
  showBeautyModal.value = true;
  openModal();
}

function closeBeautyModal() {
  showBeautyModal.value = false;

  if (!showUserModal.value) {
    closeModal();
  }
}

function handleBeautySaved() {
  // اگر بعد از ذخیره لازم است اطلاعات کاربر هم تازه شود:
  refreshProfile();
}

async function handleSave() {
  await refreshProfile();
}

function toEnglishDigits(value) {
  return String(value ?? "")
    .replace(/[۰-۹]/g, (digit) => "۰۱۲۳۴۵۶۷۸۹".indexOf(digit))
    .replace(/[٠-٩]/g, (digit) => "٠١٢٣٤٥٦٧٨٩".indexOf(digit));
}

function formatBirthDate(value) {
  if (!value) return "-";

  // تاریخ را به قسمت قبل از زمان محدود می‌کنیم؛ عمداً از new Date استفاده نمی‌کنیم.
  const datePart = toEnglishDigits(String(value).trim().split("T")[0]);
  const parts = datePart.split(/[-/]/);

  if (parts.length !== 3 || parts.some((part) => !part)) {
    return "-";
  }

  const [year, month, day] = parts;
  return `${year}/${month}/${day}`;
}

// const formatBirthDate = (date) => {
//   if (!date) return "-";
//   const rawDate = date.split("T")[0];
//   return rawDate.replaceAll("-", "/");
// };
</script>
