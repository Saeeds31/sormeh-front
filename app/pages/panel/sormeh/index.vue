<!-- app/pages/panel/sormeh/index.vue -->
<template>
  <div class="space-y-6" dir="rtl">
    <!-- کارت اصلی کلاب -->
    <div class="bg-gray-100 rounded-xl shadow-xs overflow-hidden">
      <div
        class="relative bg-[#9374C9] p-3 sm:p-4 flex items-center justify-between"
      >
        <!-- کپسول زرد نمایش تعداد سکه‌ها -->
        <div
          class="z-10 bg-[#FFD857] text-amber-950 px-4 py-2 rounded-full font-bold text-xs sm:text-sm flex items-center gap-2 shadow-sm"
        >
          <span>تعداد سکه شما:</span>
          <span class="font-extrabold text-base">{{
            formatNumber(summaryData?.total_points)
          }}</span>

          <SharedAppImage src="/icons/coin.png" alt="لوگو" img-class="" />
        </div>
        <div class="absolute items-center left-2 top-2 gap-2 z-10">
          <SharedAppImage src="/images/coins.png" alt="لوگو" img-class="" />
        </div>
      </div>

      <!-- محتوای داخلی کلاب -->
      <div class="p-4 sm:p-6 space-y-6 max-md:mt-4">
        <!-- ۲. تب‌های ناوبری کلاب -->
        <div
          class="flex items-center gap-2 overflow-x-auto pb-2 border-b border-gray-100 scrollbar-none"
        >
          <button
            v-for="tab in clubTabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            class="px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap cursor-pointer"
            :class="
              activeTab === tab.id
                ? 'bg-[#533470] text-white shadow-xs font-bold'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            "
          >
            {{ tab.title }}
          </button>
        </div>

        <!-- تب ۱: سرمه کلاب (محتوای اصلی) -->
        <div v-if="activeTab === 'club'" class="space-y-6">
          <!-- لودینگ خلاصه کلاب -->
          <div v-if="summaryPending" class="flex justify-center py-8">
            <SharedLoadingSpinner size="md" />
          </div>

          <!-- ۳. کارت‌های سه‌گانه وضعیت کاربر -->
          <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <!-- موجودی سرمه کلاب -->
            <div
              class="bg-gray-200 border border-gray-100 rounded-xl p-4 flex flex-col justify-between h-28"
            >
              <div class="flex items-center justify-start gap-2 text-gray-700">
                <Wallet class="w-5 h-5 text-gray-500" />
                <span class="text-xs sm:text-sm font-bold"
                  >موجودی سرمه کلاب</span
                >
              </div>
              <div class="text-left">
                <span class="text-base sm:text-lg font-bold text-gray-900">
                  {{ formatNumber(summaryData?.total_points) }}
                </span>
                <span class="text-xs text-gray-500 mr-1">سکه</span>
              </div>
            </div>

            <div
              class="bg-gray-200 border border-gray-100 rounded-xl p-4 flex flex-col justify-between h-28"
            >
              <div class="flex items-center justify-start gap-2 text-gray-700">
                <BarChart2 class="w-5 h-5 text-gray-500" />
                <span class="text-xs sm:text-sm font-bold">سطح کاربری شما</span>
              </div>
              <div class="flex items-center justify-end gap-2">
                <SharedAppImage
                  src="/icons/coinB.svg"
                  alt="لوگو"
                  img-class="w-6"
                />

                <span class="text-sm font-bold text-gray-900">
                  {{ getTierLabel(summaryData?.level) }}
                </span>
              </div>
            </div>

            <!-- تاریخ عضویت -->
            <div
              class="bg-gray-200 border border-gray-100 rounded-xl p-4 flex flex-col justify-between h-28"
            >
              <div class="flex items-center justify-start gap-2 text-gray-700">
                <Calendar class="w-5 h-5 text-gray-500" />
                <span class="text-xs sm:text-sm font-bold">تاریخ عضویت</span>
              </div>
              <div class="text-left">
                <span class="text-xs sm:text-sm font-bold text-gray-900">
                  {{ formatMembershipDate(profileData?.user?.created_at) }}
                </span>
              </div>
            </div>
          </div>

          <div class="space-y-3">
            <div class="flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-[#533470]"></span>
              <h3 class="text-xs sm:text-sm font-bold text-gray-900">
                سطح‌بندی سرمه کلاب
              </h3>
            </div>

            <div class="overflow-x-auto rounded-xl border border-gray-100">
              <table class="w-full text-center text-xs border-collapse">
                <thead>
                  <tr class="bg-[#ddd5e8] text-gray-800 font-bold">
                    <th class="py-3 px-3 text-right pr-6">عنوان</th>
                    <th class="py-3 px-3">سطح برنز</th>
                    <th class="py-3 px-3">سطح گلد</th>
                    <th class="py-3 px-3">سطح پلاتینیوم</th>
                  </tr>
                </thead>
                <tbody
                  class="divide-y divide-gray-100 text-gray-700 font-medium"
                >
                  <tr class="hover:bg-gray-50/60">
                    <td
                      class="py-3 px-3 text-right pr-6 text-gray-500 font-bold align-middle"
                    >
                      نماد
                    </td>
                    <td class="py-3 px-3 text-center align-middle">
                      <div class="flex items-center justify-center">
                        <SharedAppImage
                          src="/icons/coinB.svg"
                          alt="لوگو برنز"
                          img-class="w-6 h-6 object-contain"
                        />
                      </div>
                    </td>
                    <td class="py-3 px-3 text-center align-middle">
                      <div class="flex items-center justify-center">
                        <SharedAppImage
                          src="/icons/coin.png"
                          alt="لوگو گلد"
                          img-class="w-7 h-7 object-contain"
                        />
                      </div>
                    </td>
                    <td class="py-3 px-3 text-center align-middle">
                      <div class="flex items-center justify-center">
                        <SharedAppImage
                          src="/icons/coinN.svg"
                          alt="لوگو پلاتینیوم"
                          img-class="w-6 h-6 object-contain"
                        />
                      </div>
                    </td>
                  </tr>

                  <tr class="bg-gray-200 hover:bg-gray-50">
                    <td
                      class="py-3.5 px-3 text-right pr-6 text-gray-500 font-bold"
                    >
                      تعداد سکه مورد نیاز
                    </td>
                    <td class="py-3.5 px-3 my-2">(۰ تا ۵۰۰)</td>
                    <td class="py-3.5 px-3">(۵۰۰ تا ۱۰۰۰)</td>
                    <td class="py-3.5 px-3">(۱۰۰۰ تا ۲۰۰۰)</td>
                  </tr>

                  <tr class="hover:bg-gray-50/60">
                    <td
                      class="py-3.5 px-3 text-right pr-6 text-gray-500 font-bold"
                    >
                      درصد تخفیف
                    </td>
                    <td class="py-3.5 px-3">۲%</td>
                    <td class="py-3.5 px-3">۳%</td>
                    <td class="py-3.5 px-3">۴%</td>
                  </tr>

                  <tr class="bg-gray-200 hover:bg-gray-50">
                    <td
                      class="py-3.5 px-3 text-right pr-6 text-gray-500 font-bold"
                    >
                      حمل و نقل
                    </td>
                    <td class="py-3.5 px-3">-</td>
                    <td class="py-3.5 px-3">یک ارسال رایگان در ماه</td>
                    <td class="py-3.5 px-3">دو ارسال رایگان در ماه</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- ۵. بخش ماموریت‌ها -->
          <div class="space-y-3 pt-2">
            <div class="flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-[#533470]"></span>
              <h3 class="text-xs sm:text-sm font-bold text-gray-900">
                ماموریت‌ها
              </h3>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- ماموریت ۱: تکمیل پروفایل بیوتی -->
              <div
                class="relative bg-white border border-gray-200/90 rounded-xl p-4 shadow-2xs flex flex-col justify-between overflow-hidden"
              >
                <div
                  class="absolute top-0 left-4 bg-[#533470] text-white text-[11px] font-bold px-3.5 py-1 rounded-b-md shadow-xs"
                >
                  ۸ سکه
                </div>

                <div class="flex items-center justify-between gap-4 mt-4">
                  <div
                    class="w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-gray-100 border border-gray-100"
                  >
                    <img
                      src="/images/beauty-profile.svg"
                      alt="پروفایل بیوتی"
                      class="w-full h-full object-cover"
                      onerror="
                        this.src =
                          'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80'
                      "
                    />
                  </div>
                  <div class="space-y-1.5 text-right flex-1">
                    <h4 class="font-bold text-xs sm:text-sm text-gray-900">
                      تکمیل پروفایل بیوتی
                    </h4>
                    <p class="text-[11px] text-gray-500 leading-relaxed">
                      پروفایل بیوتی خود را تکمیل کنید و امتیاز هدیه‌تون رو
                      دریافت کنید.
                    </p>
                  </div>
                </div>

                <div class="pt-4 text-left">
                  <button
                    @click="openBeautyModal"
                    class="border border-[#533470] text-[#533470] hover:bg-[#533470] hover:text-white px-5 py-1.5 rounded-lg text-xs font-bold transition duration-200 cursor-pointer"
                  >
                    {{
                      hasBeautySelections ? "ویرایش انتخاب‌ها" : "تکمیل کنید"
                    }}
                  </button>
                </div>
              </div>

              <!-- ماموریت ۲: تکمیل اطلاعات شخصی -->
              <div
                class="relative bg-white border border-gray-200/90 rounded-xl p-4 shadow-2xs flex flex-col justify-between overflow-hidden"
              >
                <div
                  class="absolute top-0 left-4 bg-[#533470] text-white text-[11px] font-bold px-3.5 py-1 rounded-b-md shadow-xs"
                >
                  ۷ سکه
                </div>

                <div class="flex items-center justify-between gap-4 mt-4">
                  <div
                    class="w-20 h-20 rounded-xl bg-gray-100/90 flex items-center justify-center shrink-0 border border-gray-100"
                  >
                    <UserCheck class="w-8 h-8 text-gray-500" />
                  </div>
                  <div class="space-y-1.5 text-right flex-1">
                    <h4 class="font-bold text-xs sm:text-sm text-gray-900">
                      تکمیل اطلاعات شخصی
                    </h4>
                    <p class="text-[11px] text-gray-500 leading-relaxed">
                      شماره و تاریخ تولد خود را تکمیل کنید.
                    </p>
                  </div>
                </div>

                <div class="pt-4 text-left">
                  <button
                    @click="handleMissionAction('personal')"
                    class="border border-[#533470] text-[#533470] hover:bg-[#533470] hover:text-white px-5 py-1.5 rounded-lg text-xs font-bold transition duration-200 cursor-pointer"
                  >
                    تکمیل کنید
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- تب ۲: جایزه‌های دریافتی (مزایای استفاده شده) -->
        <div v-else-if="activeTab === 'rewards'" class="space-y-4">
          <div v-if="usagesPending" class="flex justify-center py-12">
            <SharedLoadingSpinner size="lg" />
          </div>
          <div v-else-if="usagesData?.data?.length" class="space-y-3">
            <div
              v-for="item in usagesData.data"
              :key="item.id"
              class="bg-white border border-gray-200 rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs"
            >
              <div class="space-y-1">
                <span class="font-bold text-gray-900 text-sm">
                  {{
                    item.benefit_type === "free_shipping"
                      ? "ارسال رایگان"
                      : "تخفیف خرید"
                  }}
                </span>
                <p class="text-gray-500">
                  دوره: {{ item.period }} | سطح: {{ item.level }}
                </p>
                <p v-if="item.order" class="text-gray-400">
                  سفارش #{{ item.order.id }} - وضعیت:
                  {{ item.order.status_label }}
                </p>
              </div>
              <div class="text-left font-bold text-[#533470]">
                {{
                  item.amount > 0 ? formatNumber(item.amount) + " تومان" : "-"
                }}
              </div>
            </div>
          </div>
          <div v-else class="text-center py-12 text-gray-400 text-sm">
            هیچ مزیت استفاده‌شده‌ای ثبت نشده است.
          </div>
        </div>

        <!-- تب ۳: تاریخچه سکه‌های دریافتی -->
        <div v-else-if="activeTab === 'history'" class="space-y-4">
          <div v-if="transactionsPending" class="flex justify-center py-12">
            <SharedLoadingSpinner size="lg" />
          </div>
          <div v-else-if="transactionsData?.data?.length" class="space-y-3">
            <div
              v-for="tx in transactionsData.data"
              :key="tx.id"
              class="bg-white border border-gray-200 rounded-xl p-4 flex justify-between items-center text-xs"
            >
              <div class="space-y-1">
                <div class="font-bold text-gray-900 text-sm">
                  {{ tx.title }}
                </div>
                <div class="text-gray-500">{{ tx.description || "-" }}</div>
              </div>
              <div
                class="font-extrabold text-sm px-3 py-1 rounded-lg"
                :class="
                  tx.type === 'increase'
                    ? 'bg-green-50 text-green-700'
                    : 'bg-red-50 text-red-700'
                "
              >
                {{ tx.type === "increase" ? "+" : "" }}{{ tx.points }} سکه
              </div>
            </div>
          </div>
          <div v-else class="text-center py-12 text-gray-400 text-sm">
            تاریخچه‌ای یافت نشد.
          </div>
        </div>

        <!-- تب ۴: پرسش‌های متداول -->
        <div v-else class="text-center py-12 text-gray-400 text-sm">
          پرسش‌های متداول به زودی اضافه خواهند شد...
        </div>
      </div>
    </div>

    <!-- مودال تکمیل پروفایل بیوتی (طراحی دو ستونی مطابق طرح) -->
    <div
      v-if="showBeautyModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      @click.self="closeBeautyModal"
    >
      <div
        class="bg-white rounded-2xl w-full max-w-lg p-6 space-y-6 relative shadow-xl"
        dir="rtl"
      >
        <!-- دکمه بستن -->
        <button
          @click="closeBeautyModal"
          class="absolute left-4 top-4 text-gray-400 hover:text-gray-600 cursor-pointer"
        >
          <X class="w-5 h-5" />
        </button>

        <h3 class="text-base font-bold text-gray-900 text-center">
          تکمیل پروفایل بیوتی
        </h3>

        <!-- لودینگ مشخصات سیستمی -->
        <div
          v-if="systemSpecsLoading"
          class="flex flex-col items-center justify-center py-8 gap-2"
        >
          <SharedLoadingSpinner size="md" />
          <span class="text-xs text-gray-500">در حال دریافت گزینه‌ها...</span>
        </div>

        <!-- پیام خطا در صورت عدم ارتباط با سرور -->
        <div v-else-if="systemSpecsError" class="text-center py-6 space-y-3">
          <p class="text-xs text-red-600 font-medium">{{ systemSpecsError }}</p>
          <button
            type="button"
            @click="fetchSystemSpecs"
            class="px-4 py-1.5 border border-[#533470] text-[#533470] rounded-lg text-xs font-bold hover:bg-[#533470] hover:text-white transition cursor-pointer"
          >
            تلاش مجدد
          </button>
        </div>

        <!-- فرم انتخاب مشخصات -->
        <div v-else class="space-y-5">
          <div
            v-if="systemSpecs.length === 0"
            class="text-center py-6 text-xs text-gray-500"
          >
            هیچ گزینه‌ای برای نمایش یافت نشد.
          </div>

          <div v-else class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              v-for="spec in systemSpecs"
              :key="spec.id"
              class="flex flex-col gap-1.5"
            >
              <label
                :for="`spec-${spec.id}`"
                class="text-xs font-bold text-gray-700"
              >
                {{ spec.title }}:
              </label>
              <select
                :id="`spec-${spec.id}`"
                v-model="selectedSelections[spec.id]"
                class="border border-gray-300 rounded-xl px-3 py-2 text-xs focus:outline-hidden focus:border-[#533470] bg-white h-10 transition-colors"
              >
                <option :value="undefined" disabled>انتخاب کنید</option>
                <option
                  v-for="val in spec.values"
                  :key="val.id"
                  :value="val.id"
                >
                  {{ val.value }}
                </option>
              </select>
            </div>
          </div>

          <!-- پیام خطای اعتبارسنجی یا ارسال فرم -->
          <div
            v-if="submitErrorMessage"
            class="p-2.5 rounded-lg bg-red-50 text-red-600 text-xs text-center font-medium"
          >
            {{ submitErrorMessage }}
          </div>

          <div class="pt-2">
            <button
              @click="submitBeautyProfile"
              :disabled="
                submittingBeauty ||
                systemSpecsLoading ||
                systemSpecs.length === 0
              "
              class="w-full bg-[#533470] hover:bg-[#43275b] text-white py-3 rounded-xl font-bold text-xs transition duration-200 cursor-pointer disabled:opacity-50 shadow-sm"
            >
              {{ submittingBeauty ? "در حال ذخیره..." : "تایید" }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { Wallet, BarChart2, Calendar, UserCheck, X } from "lucide-vue-next";
import { useApi } from "~/composables/api/useApi";

definePageMeta({
  middleware: "auth",
  layout: "panel",
});

const { $api } = useNuxtApp();
const { getUserProfile } = useApi();

const activeTab = ref("club");
const clubTabs = [
  { id: "club", title: "سرمه کلاب" },
  { id: "rewards", title: "جایزه‌های دریافتی" },
  { id: "history", title: "تاریخچه سکه‌های دریافتی" },
  { id: "faq", title: "پرسش‌های متداول" },
];

// داده‌های باشگاه
const summaryData = ref(null);
const summaryPending = ref(true);

const transactionsData = ref(null);
const transactionsPending = ref(false);

const usagesData = ref(null);
const usagesPending = ref(false);

// اطلاعات پروفایل کاربر، شامل تاریخ عضویت
const profileData = ref(null);
const profilePending = ref(false);

const fetchProfile = async () => {
  profilePending.value = true;
  try {
    profileData.value = await getUserProfile();
  } catch (e) {
    console.error("Error fetching user profile", e);
    profileData.value = null;
  } finally {
    profilePending.value = false;
  }
};

// مودال بیوتی
const showBeautyModal = ref(false);
const systemSpecs = ref([]);
const systemSpecsLoading = ref(false);
const systemSpecsError = ref("");
const selectedSelections = ref({});
const hasBeautySelections = ref(false);
const submittingBeauty = ref(false);
const submitErrorMessage = ref("");

const fetchSummary = async () => {
  try {
    const res = await $api.get("/front/club/summary");
    summaryData.value = res.data || res;
  } catch (e) {
    console.error("Error fetching club summary", e);
  } finally {
    summaryPending.value = false;
  }
};

const fetchTransactions = async () => {
  transactionsPending.value = true;
  try {
    const res = await $api.get("/front/club/transactions");
    transactionsData.value = res.data || res;
  } catch (e) {
    console.error("Error fetching transactions", e);
  } finally {
    transactionsPending.value = false;
  }
};

const fetchUsages = async () => {
  usagesPending.value = true;
  try {
    const res = await $api.get("/front/club/usagesFront");
    usagesData.value = res.data || res;
  } catch (e) {
    console.error("Error fetching usages", e);
  } finally {
    usagesPending.value = false;
  }
};

const fetchSystemSpecs = async () => {
  systemSpecsLoading.value = true;
  systemSpecsError.value = "";
  try {
    const res = await $api.get("/specifications/system");
    const payload = res.data || res;
    if (payload.success && Array.isArray(payload.data)) {
      systemSpecs.value = payload.data;
    } else if (Array.isArray(payload)) {
      systemSpecs.value = payload;
    } else {
      systemSpecs.value = [];
    }
  } catch (e) {
    console.error("Error fetching system specifications:", e);
    systemSpecsError.value = "عدم برقراری ارتباط با سرور برای دریافت گزینه‌ها.";
  } finally {
    systemSpecsLoading.value = false;
  }
};

// دریافت انتخاب‌های قبلی کاربر
const checkMyBeautySelections = async () => {
  try {
    const response = await $api.get("front/specifications/my-selections");
    const res = response.data || response;

    if (res.has_selections && Array.isArray(res.data) && res.data.length > 0) {
      hasBeautySelections.value = true;
      const initialMap = {};
      res.data.forEach((item) => {
        initialMap[item.specification_id] = Number(item.specification_value_id);
      });
      selectedSelections.value = initialMap;
    } else {
      hasBeautySelections.value = false;
    }
  } catch (e) {
    console.error("Error fetching my-selections:", e);
  }
};

// باز و بسته کردن مودال
const openBeautyModal = async () => {
  submitErrorMessage.value = "";
  showBeautyModal.value = true;
  if (systemSpecs.value.length === 0) {
    await fetchSystemSpecs();
  }
};

const closeBeautyModal = () => {
  if (submittingBeauty.value) return;
  showBeautyModal.value = false;
  submitErrorMessage.value = "";
};

// ثبت انتخاب‌های کاربر
const submitBeautyProfile = async () => {
  submitErrorMessage.value = "";

  const selectionsArray = Object.entries(selectedSelections.value)
    .filter(
      ([_, val_id]) => val_id !== undefined && val_id !== null && val_id !== "",
    )
    .map(([spec_id, val_id]) => ({
      specification_id: Number(spec_id),
      specification_value_id: Number(val_id),
    }));

  if (selectionsArray.length === 0) {
    submitErrorMessage.value = "حداقل یک انتخاب الزامی است.";
    return;
  }

  submittingBeauty.value = true;
  try {
    const res = await $api.post("/front/specifications/user-selections", {
      selections: selectionsArray,
    });
    const resultData = res.data || res;

    if (resultData.success) {
      hasBeautySelections.value = true;
      showBeautyModal.value = false;
      await Promise.all([fetchSummary(), checkMyBeautySelections()]);
    }
  } catch (e) {
    console.error("Error submitting user selections:", e);
    const backendMsg =
      e.response?.data?.errors?.selections?.[0] ||
      e.response?.data?.message ||
      "خطا در ثبت اطلاعات، لطفاً مجدداً تلاش فرمایید.";
    submitErrorMessage.value = backendMsg;
  } finally {
    submittingBeauty.value = false;
  }
};

const getTierLabel = (level) => {
  switch (level) {
    case "gold":
      return "سطح گلد";
    case "platinum":
      return "سطح پلاتینیوم";
    default:
      return "سطح برنز";
  }
};

const formatNumber = (num) => {
  if (num === null || num === undefined) return "۰";
  return Number(num).toLocaleString("fa-IR");
};

const formatMembershipDate = (date) => {
  if (!date) return "-";
  const parsedDate = new Date(date);
  if (Number.isNaN(parsedDate.getTime())) {
    return "-";
  }
  return new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(parsedDate);
};

const handleMissionAction = (type) => {
  if (type === "personal") {
    navigateTo("/panel");
  }
};

onMounted(() => {
  fetchSummary();
  fetchProfile();
  checkMyBeautySelections();
  fetchTransactions();
  fetchUsages();
});
</script>
