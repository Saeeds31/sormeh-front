<!-- app/pages/panel/orders.vue -->
<!-- <template>
  <div class="p-8 bg-gray-100 rounded-xl">
    <h3 class="font-bold text-xl pb-4 mb-4 border-b">سفارش ها</h3>

    <div v-if="!ordersData" class="text-center py-8">
      <SharedLoadingSpinner size="lg" />
    </div>

    <div v-else-if="orders.length === 0" class="text-center py-8">
      <p class="text-muted">هیچ سفارشی یافت نشد</p>
    </div>

    <div
      v-else
      v-for="order in orders"
      :key="order.id"
      class="border rounded-inner p-4 mx-auto shadow flex flex-col gap-4 bg-primary mb-4"
    >
      <div class="flex justify-between items-center">
        <div class="flex items-center gap-2">
          <component
            :is="getStatusIcon(order.status)"
            class="w-5 h-5 text-gray-600"
          />
          <span :class="getStatusColor(order.status)">{{
            getStatusText(order.status)
          }}</span>

          <span
            v-if="order.status == 'reserved'"
            class="font-bold text-green-950"
          >
            نگه داشته شده تا تاریخ:{{
              new Date(order.reserved_until).toLocaleDateString("fa")
            }}
          </span>
        </div>
        <nuxt-link :to="`order/${order.id}`" class="text-muted">
          <ChevronLeft />
        </nuxt-link>
      </div>

      <div class="flex items-center text-sm text-muted gap-3 border-b pb-4">
        <span>{{ order.date }}</span>
        <span class="w-2 h-2 bg-accent rounded-full"></span>
        <span
          >کد سفارش: <span class="font-bold">{{ order.id }}</span></span
        >
        <span class="w-2 h-2 bg-accent rounded-full"></span>
        <span
          >مبلغ:
          <span class="font-bold"
            >{{ order.total?.toLocaleString() }} تومان</span
          ></span
        >
      </div>

      <div v-if="order.items.length" class="flex items-center gap-4">
        <img
          :src="$getImageUrl(order.items[0].product.main_image)"
          class="w-16 h-16 rounded"
        />
        <div class="flex flex-col gap-3">
          <span class="font-bold text-sm">{{
            order.items[0].product.title
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useApi } from "@/composables/api/useApi";
const { $getImageUrl } = useNuxtApp();

definePageMeta({
  layout: "panel",
  middleware: "auth",
});

import {
  X,
  CheckCircle,
  Clock,
  AlertCircle,
  Disc,
  ChevronLeft,
} from "lucide-vue-next";
import { ref } from "vue";

const { getOrders } = useApi();

const { data: ordersData } = await useAsyncData(
  "userOrders",
  async () => {
    try {
      return await getOrders();
    } catch (error) {
      console.error("❌ Failed to fetch orders:", error);
      return { data: [] };
    }
  },
  {
    lazy: true,
    server: false,
  },
);

const orders = computed(() => ordersData.value?.orders || []);

function getStatusIcon(status) {
  switch (status) {
    case "cancelled":
      return AlertCircle;
    case "failed":
      return AlertCircle;
    case "pending":
      return Clock;
    case "delivered":
      return CheckCircle;
    default:
      return Clock;
  }
}
function getStatusText(status) {
  switch (status) {
    case "card_transfer_pending":
      return "در انتظار آپلود رسید";
    case "card_transfer_review":
      return "در حال پردازش رسید";
    case "card_transfer_send_again":
      return "در انتظار آپلود مجدد رسید";
    case "cancelled":
      return "لغو شده";
    case "failed":
      return "لغو شده";

    case "pending":
      return "در حال بررسی";
    case "delivered":
      return "تحویل داده شد";
    case "paid":
      return "پرداخت شده";
    case "completed":
      return "تکمیل شده";
    case "reserved":
      return "رزرو شده";
    default:
      return "نامشخص";
  }
}

function getStatusColor(status) {
  switch (status) {
    case "cancelled":
      return "text-red";
    case "failed":
      return "text-red";
    case "pending":
      return "text-gold";
    case "delivered":
      return "text-strong";
    default:
      return "text-muted";
  }
}
</script>

<style scoped></style> -->

<!-- app/pages/panel/orders.vue -->
<template>
  <div class="p-8 bg-gray-100 rounded-xl">
    <!-- تب‌های فیلتر بر اساس فیگما -->
    <div class="flex flex-wrap items-center gap-3 mb-6">
      <button
        v-for="tab in filterTabs"
        :key="tab.id"
        @click="activeTab = tab.id"
        class="px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 border"
        :class="
          activeTab === tab.id
            ? 'bg-[var(--bg-secondary)] text-white border-[var(--bg-secondary)] shadow-sm'
            : 'bg-white text-gray-600 border-gray-200 hover:bg-[#F2EFF9]'
        "
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- وضعیت بارگذاری -->
    <div v-if="!ordersData" class="text-center py-12">
      <SharedLoadingSpinner size="lg" />
    </div>

    <!-- خالی بودن لیست -->
    <div
      v-else-if="filteredOrders.length === 0"
      class="text-center py-12 bg-white rounded-2xl border border-gray-200"
    >
      <p class="text-gray-500 text-sm">هیچ سفارشی یافت نشد</p>
    </div>

    <!-- لیست سفارش‌ها -->
    <div v-else class="space-y-5">
      <div
        v-for="order in filteredOrders"
        :key="order.id"
        class="bg-gray-200 rounded-xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex flex-col gap-4"
      >
        <!-- هدر کارت: بج وضعیت در راست، دکمه‌های عملیات در چپ -->
        <div class="flex items-center justify-between gap-3">
          <!-- سمت راست: نشان وضعیت + رزرو -->
          <div class="flex items-center gap-2">
            <div
              class="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-semibold border"
              :class="getStatusBadgeClass(order.status)"
            >
              <component
                :is="getStatusIcon(order.status)"
                class="w-3.5 h-3.5 shrink-0"
              />
              <span>{{ getStatusText(order.status) }}</span>
            </div>

            <span
              v-if="order.status === 'reserved' && order.reserved_until"
              class="font-medium text-xs text-amber-700 bg-amber-50 px-2.5 py-2 rounded-lg border border-amber-200"
            >
              رزرو تا: {{ formatOrderDate(order.reserved_until) }}
            </span>
          </div>

          <!-- سمت چپ: دکمه پرداخت مجدد (در صورت نیاز) و دکمه جزئیات بنفش -->
          <div class="flex items-center gap-2">
            <button
              v-if="['pending', 'failed', 'cancelled'].includes(order.status)"
              type="button"
              class="px-3.5 py-1.5 rounded-lg text-xs font-medium bg-white text-[#523e74] border border-[#d8d3e5] hover:bg-gray-50 transition-colors shadow-sm"
            >
              پرداخت مجدد
            </button>

            <nuxt-link
              :to="`order/${order.id}`"
              class="inline-flex items-center gap-1 btn"
            >
              <ChevronRight class="w-3.5 h-3.5 rotate-180" />
              <span>مشاهده جزئیات</span>
            </nuxt-link>
          </div>
        </div>

        <!-- نوار سفید مشخصات سفارش (دقیقاً مثل فیگما) -->
        <div
          class="bg-white rounded-xl py-3 px-4 flex flex-wrap items-center justify-between gap-y-2 text-xs md:text-sm text-gray-700 border border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.02)]"
        >
          <div>
            <span class="text-gray-400">کدسفارش: </span>
            <span class="font-bold text-gray-900">{{ order.id }}</span>
          </div>

          <div class="flex items-center gap-1">
            <span class="text-gray-400">تاریخ/ساعت: </span>
            <span class="font-medium text-gray-800">{{
              formatOrderDate(order.created_at || order.date)
            }}</span>
          </div>

          <div>
            <span class="text-gray-400">تخفیف: </span>
            <span class="font-medium text-gray-800">
              {{ (order.discount_amount || 0).toLocaleString("fa-IR") }} تومان
            </span>
          </div>

          <div>
            <span class="text-gray-400">مبلغ کل پرداختی: </span>
            <span class="font-bold text-gray-900">
              {{ (order.total || 0).toLocaleString("fa-IR") }} تومان
            </span>
          </div>
        </div>

        <!-- لیست اقلام سفارش -->
        <div v-if="order.items && order.items.length" class="space-y-3 pt-1">
          <div
            v-for="item in order.items"
            :key="item.id"
            class="flex items-center justify-between gap-4 py-3 border-b border-gray-300/70 last:border-b-0"
          >
            <!-- تصویر و عنوان و تعداد در سمت راست -->
            <div class="flex items-center gap-3">
              <img
                :src="$getImageUrl(item.product?.main_image)"
                class="w-24 h-28 rounded-xl object-cover bg-white border border-gray-200 shrink-0"
                :alt="item.product?.title || 'محصول'"
              />
              <div class="flex flex-col gap-1.5">
                <span class="font-bold text-sm text-gray-800 line-clamp-1">
                  {{ item.product?.title || "محصول بدون نام" }}
                </span>
                <div
                  class="flex items-center gap-4 text-sm text-gray-500 pt-1.5"
                >
                  <span
                    >تعداد:
                    {{ (item.quantity || 1).toLocaleString("fa-IR") }}</span
                  >
                  <span
                    >قیمت :
                    {{ (item.price || 0).toLocaleString("fa-IR") }} تومان</span
                  >
                </div>
              </div>
            </div>

            <!-- قیمت کل آیتم در سمت چپ -->
            <div class="text-left shrink-0">
              <span class="font-bold text-xs md:text-sm text-strong">
                {{
                  ((item.price || 0) * (item.quantity || 1)).toLocaleString(
                    "fa-IR",
                  )
                }}
                تومان
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useApi } from "@/composables/api/useApi";
import { CheckCircle, Clock, AlertCircle, ChevronRight } from "lucide-vue-next";
import { ref, computed } from "vue";

const { $getImageUrl } = useNuxtApp();
const { getOrders } = useApi();

definePageMeta({
  layout: "panel",
  middleware: "auth",
});

// تب‌های وضعیت مطابق فیگما
const activeTab = ref("all");
const filterTabs = [
  { id: "all", label: "همه سفارش ها" },
  { id: "processing", label: "سفارش های در حال اجرا" },
  { id: "completed", label: "سفارش های تکمیل شده" },
  { id: "cancelled", label: "سفارش های لغو شده" },
];

// دریافت اطلاعات سفارش‌ها
const { data: ordersData } = await useAsyncData(
  "userOrders",
  async () => {
    try {
      return await getOrders();
    } catch (error) {
      console.error("❌ Failed to fetch orders:", error);
      return { data: [] };
    }
  },
  {
    lazy: true,
    server: false,
  },
);

const orders = computed(() => ordersData.value?.orders || []);

// منطق فیلتر تب‌ها بر اساس status دریافتی از سرور
const filteredOrders = computed(() => {
  const list = orders.value;
  if (activeTab.value === "processing") {
    return list.filter((o) =>
      [
        "pending",
        "card_transfer_pending",
        "card_transfer_review",
        "card_transfer_send_again",
        "reserved",
      ].includes(o.status),
    );
  }
  if (activeTab.value === "completed") {
    return list.filter((o) =>
      ["delivered", "completed", "paid"].includes(o.status),
    );
  }
  if (activeTab.value === "cancelled") {
    return list.filter((o) => ["cancelled", "failed"].includes(o.status));
  }
  return list;
});

// فرمت تاریخ و ساعت به صورت جلالی فارسی
function formatOrderDate(dateString) {
  if (!dateString) return "---";
  const d = new Date(dateString);
  if (isNaN(d.getTime())) return dateString;

  const datePart = d.toLocaleDateString("fa-IR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const timePart = d.toLocaleTimeString("fa-IR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return `${datePart} / ساعت ${timePart}`;
}

// آیکون وضعیت بر اساس تصویر فیگما
function getStatusIcon(status) {
  switch (status) {
    case "cancelled":
    case "failed":
      return AlertCircle;
    case "pending":
    case "card_transfer_pending":
    case "card_transfer_review":
    case "card_transfer_send_again":
      return Clock;
    case "delivered":
    case "completed":
    case "paid":
      return CheckCircle;
    default:
      return Clock;
  }
}

// متن وضعیت بر اساس داده‌های فرانت
function getStatusText(status) {
  switch (status) {
    case "card_transfer_pending":
      return "در انتظار آپلود رسید";
    case "card_transfer_review":
      return "در حال پردازش رسید";
    case "card_transfer_send_again":
      return "در انتظار آپلود مجدد رسید";
    case "cancelled":
    case "failed":
      return "لغو شده";
    case "pending":
      return "در انتظار پرداخت";
    case "delivered":
      return "تحویل داده شد";
    case "paid":
      return "پرداخت شده";
    case "completed":
      return "تکمیل شده";
    case "reserved":
      return "رزرو شده";
    default:
      return "نامشخص";
  }
}

// پالت رنگی بج وضعیت‌ها دقیقاً مطابق فیگما
function getStatusBadgeClass(status) {
  switch (status) {
    case "cancelled":
    case "failed":
      return "bg-[#FDECEC] text-[#E03838] border-[#FAC7C7]";
    case "pending":
    case "card_transfer_pending":
    case "card_transfer_review":
    case "card_transfer_send_again":
    case "reserved":
      return "bg-[#FFF8E6] text-[#E09B14] border-[#FCE6A8]";
    case "delivered":
    case "completed":
    case "paid":
      return "bg-[#EBF7EE] text-[#29974D] border-[#C0E7C9]";
    default:
      return "bg-gray-100 text-gray-600 border-gray-200";
  }
}
</script>
