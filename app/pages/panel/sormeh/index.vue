<template>
  <div class="space-y-6" dir="rtl">
    <!-- کارت اصلی کلاب -->
    <div class="bg-gray-100 rounded-xl shadow-xs overflow-hidden">
      <div
        class="relative bg-[#9374C9] p-3 sm:p-4 flex items-center justify-between overflow-hidden"
      >
        <!-- کپسول زرد نمایش تعداد سکه‌ها -->
        <div
          class="z-10 bg-[#fde047] text-amber-950 px-4 py-2 rounded-full font-bold text-xs sm:text-sm flex items-center gap-2 shadow-sm"
        >
          <div
            class="w-5 h-5 rounded-full bg-amber-500 border border-amber-600 flex items-center justify-center text-[10px] text-white"
          >
            🪙
          </div>
          <span>تعداد سکه شما:</span>
          <span class="font-extrabold text-base">{{
            formatNumber(userClubData.totalCoins)
          }}</span>
        </div>
        <div class="flex items-center gap-2 z-10">
          <div class="relative flex items-center">
            <!-- سکه نقره و برنز پس‌زمینه -->
            <div
              class="w-10 h-10 rounded-full bg-slate-300 border-2 border-white/40 shadow-inner flex items-center justify-center -ml-3"
            >
              <span class="text-[10px] font-bold text-gray-600">سرمه</span>
            </div>
            <!-- سکه طلایی اصلی -->
            <div
              class="w-14 h-14 rounded-full bg-gradient-to-tr from-amber-500 via-yellow-300 to-amber-600 border-2 border-amber-200 shadow-md flex items-center justify-center text-center p-1 z-10"
            >
              <span class="text-xs font-black text-amber-900 leading-tight"
                >سرمه<br />کلاب</span
              >
            </div>
            <div
              class="w-9 h-9 rounded-full bg-amber-800 border-2 border-white/30 shadow-inner flex items-center justify-center -mr-3"
            >
              <span class="text-[9px] font-bold text-amber-200">برنز</span>
            </div>
          </div>
        </div>
      </div>

      <!-- محتوای داخلی کلاب -->
      <div class="p-4 sm:p-6 space-y-6">
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
          <!-- ۳. کارت‌های سه‌گانه وضعیت کاربر -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                  {{ formatNumber(userClubData.totalCoins) }}
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
                <span
                  class="w-6 h-6 rounded-full bg-gradient-to-tr from-amber-800 to-amber-600 border border-amber-700 flex items-center justify-center text-[10px] text-amber-200"
                >
                  🥉
                </span>
                <span class="text-sm font-bold text-gray-900">
                  {{ userClubData.currentTier }}
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
                  {{ userClubData.membershipDate }}
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
                  <!-- ردیف نماد -->
                  <tr class="hover:bg-gray-50/60">
                    <td
                      class="py-3 px-3 text-right pr-6 text-gray-500 font-bold"
                    >
                      نماد
                    </td>
                    <td class="py-3 px-3">
                      <div
                        class="w-7 h-7 mx-auto rounded-full bg-gradient-to-tr from-amber-800 to-amber-600 border border-amber-700 shadow-xs flex items-center justify-center text-xs"
                      >
                        🥉
                      </div>
                    </td>
                    <td class="py-3 px-3">
                      <div
                        class="w-7 h-7 mx-auto rounded-full bg-gradient-to-tr from-yellow-500 to-amber-400 border border-yellow-300 shadow-xs flex items-center justify-center text-xs"
                      >
                        🥇
                      </div>
                    </td>
                    <td class="py-3 px-3">
                      <div
                        class="w-7 h-7 mx-auto rounded-full bg-gradient-to-tr from-slate-400 to-gray-200 border border-slate-300 shadow-xs flex items-center justify-center text-xs"
                      >
                        🥈
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

                  <!-- ردیف حمل و نقل -->
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
                    @click="handleMissionAction('beauty')"
                    class="border border-[#533470] text-[#533470] hover:bg-[#533470] hover:text-white px-5 py-1.5 rounded-lg text-xs font-bold transition duration-200 cursor-pointer"
                  >
                    تکمیل کنید
                  </button>
                </div>
              </div>

              <!-- ماموریت ۲: تکمیل اطلاعات شخصی -->
              <div
                class="relative bg-white border border-gray-200/90 rounded-xl p-4 shadow-2xs flex flex-col justify-between overflow-hidden"
              >
                <!-- بج سکه بالا گوشه -->
                <div
                  class="absolute top-0 left-4 bg-[#533470] text-white text-[11px] font-bold px-3.5 py-1 rounded-b-md shadow-xs"
                >
                  ۷ سکه
                </div>

                <div class="flex items-center justify-between gap-4 mt-4">
                  <!-- باکس آیکون کاربر -->
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
                  <div
                    class="inline-flex items-center gap-1.5 bg-[#72B742] text-white px-4 py-1.5 rounded-lg text-xs font-bold shadow-xs"
                  >
                    <CheckCircle class="w-4 h-4" />
                    <span>تکمیل شد</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          v-else
          class="text-center py-12 text-gray-400 text-sm bg-gray-50 rounded-xl border border-dashed border-gray-200"
        >
          محتوای بخش {{ clubTabs.find((t) => t.id === activeTab)?.title }} به
          زودی بارگذاری می‌شود...
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import {
  Wallet,
  BarChart2,
  Calendar,
  UserCheck,
  CheckCircle,
} from "lucide-vue-next";

definePageMeta({
  middleware: "auth",
  layout: "panel",
});

const activeTab = ref("club");
const clubTabs = [
  { id: "club", title: "سرمه کلاب" },
  { id: "rewards", title: "جایزه‌های دریافتی" },
  { id: "history", title: "تاریخچه سکه‌های دریافتی" },
  { id: "faq", title: "پرسش‌های متداول" },
];

const userClubData = ref({
  totalCoins: 100,
  currentTier: "سطح برنز",
  membershipDate: "۲۶ مهر ۱۴۰۵",
});

const formatNumber = (num) => {
  if (num === null || num === undefined) return "۰";
  return Number(num).toLocaleString("fa-IR");
};

const handleMissionAction = (type) => {
  if (type === "beauty") {
    navigateTo("/panel/beauty-profile");
  } else if (type === "personal") {
    navigateTo("/panel/profile");
  }
};
</script>
