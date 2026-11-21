<!-- app/pages/panel/sormeh/index.vue -->
<template>
  <div class="space-y-6" dir="rtl">
    <div class="bg-gray-100 rounded-xl shadow-xs overflow-hidden">
      <div
        class="relative bg-[#9374C9] p-3 sm:p-4 flex items-center justify-between"
      >
        <div
          class="z-10 bg-[#FFD857] text-amber-950 px-4 py-2 rounded-full font-bold text-xs sm:text-sm flex items-center gap-2 shadow-sm"
        >
          <span>تعداد سکه شما:</span>
          <span class="font-extrabold text-base">{{
            formatNumber(summary.data?.total_points)
          }}</span>
          <SharedAppImage src="/icons/coin.png" alt="" img-class="" />
        </div>
        <div class="absolute items-center left-2 top-2 gap-2 z-10">
          <SharedAppImage src="/images/coins.png" alt="" img-class="" />
        </div>
      </div>

      <div class="p-4 sm:p-6 space-y-6">
        <nav
          aria-label="بخش‌های سرمه کلاب"
          class="flex items-center gap-2 overflow-x-auto pb-2 border-b border-gray-100 scrollbar-none"
        >
          <button
            v-for="tab in clubTabs"
            :key="tab.id"
            type="button"
            :aria-pressed="activeTab === tab.id"
            class="px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap cursor-pointer"
            :class="
              activeTab === tab.id
                ? 'bg-[#533470] text-white shadow-xs font-bold'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            "
            @click="activeTab = tab.id"
          >
            {{ tab.title }}
          </button>
        </nav>

        <div v-if="activeTab === 'club'" class="space-y-6">
          <p
            v-if="isLoading(summary)"
            role="status"
            class="text-xs text-gray-600"
          >
            در حال دریافت اطلاعات باشگاه…
          </p>
          <div
            v-else-if="summary.status === 'error'"
            class="flex flex-wrap items-center gap-3 text-xs text-red-700"
          >
            <p role="alert">{{ summary.error }}</p>
            <button
              type="button"
              class="underline cursor-pointer"
              @click="loadSummary"
            >
              تلاش دوباره
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                <span class="text-base sm:text-lg font-bold text-gray-900">{{
                  formatNumber(summary.data?.total_points)
                }}</span>
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
                  v-if="currentTier"
                  :src="currentTier.icon"
                  alt=""
                  img-class="w-6"
                />
                <span class="text-sm font-bold text-gray-900">{{
                  currentTier?.label ?? "—"
                }}</span>
              </div>
            </div>

            <div
              class="bg-gray-200 border border-gray-100 rounded-xl p-4 flex flex-col justify-between h-28"
            >
              <div class="flex items-center justify-start gap-2 text-gray-700">
                <Calendar class="w-5 h-5 text-gray-500" />
                <span class="text-xs sm:text-sm font-bold">تاریخ عضویت</span>
              </div>
              <div class="text-left">
                <!-- قرارداد فعلی API تاریخ عضویت ندارد. -->
                <span class="text-xs sm:text-sm font-bold text-gray-900"
                  >—</span
                >
              </div>
            </div>
          </div>

          <div
            class="flex flex-wrap items-center gap-x-6 gap-y-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-xs text-gray-700"
          >
            <p>
              تخفیف فعال:
              <strong>{{
                summary.status === "success"
                  ? `${formatNumber(summary.data.discount_percent)}٪`
                  : "—"
              }}</strong>
            </p>
            <p aria-live="polite">
              وضعیت ارسال رایگان: <strong>{{ shippingLabel }}</strong>
            </p>
            <template v-if="shipping.status === 'error'">
              <p role="alert" class="text-red-700">
                {{ shipping.error
                }}<span v-if="summary.status === 'success'">
                  وضعیت بالا از اطلاعات خلاصه باشگاه نمایش داده شده است.</span
                >
              </p>
              <button
                type="button"
                class="text-[#533470] underline cursor-pointer"
                @click="loadShipping"
              >
                بررسی دوباره
              </button>
            </template>
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
                    <th scope="col" class="py-3 px-3 text-right pr-6">عنوان</th>
                    <th
                      v-for="tier in tiers"
                      :key="tier.id"
                      scope="col"
                      class="py-3 px-3"
                    >
                      {{ tier.label }}
                    </th>
                  </tr>
                </thead>
                <tbody
                  class="divide-y divide-gray-100 text-gray-700 font-medium"
                >
                  <tr class="hover:bg-gray-50/60">
                    <th
                      scope="row"
                      class="py-3 px-3 text-right pr-6 text-gray-500 font-bold align-middle"
                    >
                      نماد
                    </th>
                    <td
                      v-for="tier in tiers"
                      :key="tier.id"
                      class="py-3 px-3 text-center align-middle"
                    >
                      <div class="flex items-center justify-center">
                        <SharedAppImage
                          :src="tier.icon"
                          :alt="tier.label"
                          :img-class="
                            tier.id === 'gold'
                              ? 'w-7 h-7 object-contain'
                              : 'w-6 h-6 object-contain'
                          "
                        />
                      </div>
                    </td>
                  </tr>
                  <tr
                    v-for="(row, index) in tierRows"
                    :key="row.field"
                    :class="
                      index % 2 === 0
                        ? 'bg-gray-200 hover:bg-gray-50'
                        : 'hover:bg-gray-50/60'
                    "
                  >
                    <th
                      scope="row"
                      class="py-3.5 px-3 text-right pr-6 text-gray-500 font-bold"
                    >
                      {{ row.label }}
                    </th>
                    <td
                      v-for="tier in tiers"
                      :key="tier.id"
                      class="py-3.5 px-3"
                    >
                      {{ tier[row.field] }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="space-y-3 pt-2">
            <div class="flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-[#533470]"></span>
              <h3 class="text-xs sm:text-sm font-bold text-gray-900">
                ماموریت‌ها
              </h3>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                v-for="mission in missions"
                :key="mission.id"
                class="relative bg-white border border-gray-200/90 rounded-xl p-4 shadow-2xs flex flex-col justify-between overflow-hidden"
              >
                <div class="flex items-center justify-between gap-4 mt-4">
                  <div
                    class="w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-gray-100 flex items-center justify-center border border-gray-100"
                  >
                    <img
                      v-if="mission.id === 'beauty'"
                      src="/images/beauty-profile.svg"
                      alt="پروفایل بیوتی"
                      class="w-full h-full object-cover"
                    />
                    <UserCheck v-else class="w-8 h-8 text-gray-500" />
                  </div>
                  <div class="space-y-1.5 text-right flex-1">
                    <h4 class="font-bold text-xs sm:text-sm text-gray-900">
                      {{ mission.title }}
                    </h4>
                    <p class="text-[11px] text-gray-500 leading-relaxed">
                      {{ mission.description }}
                    </p>
                  </div>
                </div>
                <div class="pt-4 flex flex-wrap items-center justify-end gap-2">
                  <template v-if="mission.id === 'beauty'">
                    <span
                      v-if="isLoading(beautySelections)"
                      role="status"
                      class="text-[11px] text-gray-500"
                    >
                      در حال بررسی انتخاب‌ها…
                    </span>
                    <span
                      v-else-if="
                        beautySelections.status === 'success' &&
                        beautySelections.data.has_selections
                      "
                      class="text-[11px] text-gray-600"
                    >
                      انتخاب‌هایی ثبت شده‌اند
                    </span>
                    <template v-else-if="beautySelections.status === 'error'">
                      <span role="alert" class="text-[11px] text-red-700">{{
                        beautySelections.error
                      }}</span>
                      <button
                        type="button"
                        class="text-[11px] text-[#533470] underline cursor-pointer"
                        @click="loadBeautySelections"
                      >
                        تلاش دوباره
                      </button>
                    </template>
                  </template>
                  <NuxtLink
                    :to="mission.to"
                    class="inline-block border border-[#533470] text-[#533470] hover:bg-[#533470] hover:text-white px-5 py-1.5 rounded-lg text-xs font-bold transition duration-200"
                  >
                    {{
                      mission.id === "beauty" &&
                      beautySelections.data?.has_selections
                        ? "مشاهده انتخاب‌ها"
                        : mission.action
                    }}
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section
          v-else-if="activeList"
          :key="activeTab"
          class="space-y-3"
          :aria-label="listConfig[activeTab].title"
        >
          <h3 class="font-bold text-sm text-gray-900">
            {{ listConfig[activeTab].title }}
          </h3>
          <p
            v-if="isLoading(activeList)"
            role="status"
            class="rounded-xl bg-white p-4 text-sm text-gray-600"
          >
            در حال بارگذاری…
          </p>
          <div
            v-else-if="activeList.status === 'error'"
            class="flex flex-wrap items-center gap-3 rounded-xl bg-white p-4 text-sm text-red-700"
          >
            <p role="alert">{{ activeList.error }}</p>
            <button
              type="button"
              class="underline cursor-pointer"
              @click="loadList(activeTab, activeList.requestedPage)"
            >
              تلاش دوباره
            </button>
          </div>
          <template v-else>
            <p
              v-if="!activeList.data.data.length"
              class="rounded-xl bg-white p-4 text-sm text-gray-600"
            >
              {{ listConfig[activeTab].empty }}
            </p>
            <ul v-else class="space-y-2">
              <li
                v-for="item in activeList.data.data"
                :key="item.id"
                class="flex items-start justify-between gap-4 rounded-xl border border-gray-200 bg-white p-4"
              >
                <div class="min-w-0 space-y-1 text-xs text-gray-600">
                  <template v-if="activeTab === 'history'">
                    <p class="font-bold text-sm text-gray-900">
                      {{ item.title }}
                    </p>
                    <p v-if="item.description" class="break-words">
                      {{ item.description }}
                    </p>
                    <p>
                      {{ sourceLabels[item.source] ?? "سایر" }} ·
                      {{ formatDate(item.created_at) }}
                    </p>
                  </template>
                  <template v-else>
                    <p class="font-bold text-sm text-gray-900">
                      {{ benefitLabels[item.benefit_type] ?? "مزیت باشگاه" }}
                    </p>
                    <p>
                      {{ tierLabel(item.level) }} ·
                      {{ formatDate(item.created_at) }}
                    </p>
                    <p v-if="item.order?.id != null || item.order_id != null">
                      سفارش شماره
                      {{ formatNumber(item.order?.id ?? item.order_id)
                      }}<template v-if="item.order?.status_label">
                        · {{ item.order.status_label }}</template
                      >
                    </p>
                  </template>
                </div>
                <div
                  v-if="activeTab === 'history'"
                  class="shrink-0 text-xs font-bold"
                  :class="item.points < 0 ? 'text-red-700' : 'text-emerald-700'"
                >
                  <bdi>{{ formatPoints(item.points) }}</bdi> سکه
                </div>
                <div
                  v-else-if="item.benefit_type === 'discount'"
                  class="shrink-0 text-xs font-bold text-[#533470]"
                >
                  مبلغ تخفیف: <bdi>{{ formatNumber(item.amount) }}</bdi>
                </div>
              </li>
            </ul>
            <nav
              v-if="activeList.data.last_page > 1"
              aria-label="صفحه‌بندی"
              class="flex items-center justify-between gap-2 text-xs sm:text-sm"
            >
              <button
                type="button"
                :disabled="activeList.data.current_page <= 1"
                class="rounded-lg border border-gray-200 bg-white px-3 py-2 disabled:opacity-40"
                @click="changePage(-1)"
              >
                صفحه قبل
              </button>
              <span
                >صفحه {{ formatNumber(activeList.data.current_page) }} از
                {{ formatNumber(activeList.data.last_page) }}</span
              >
              <button
                type="button"
                :disabled="
                  activeList.data.current_page >= activeList.data.last_page
                "
                class="rounded-lg border border-gray-200 bg-white px-3 py-2 disabled:opacity-40"
                @click="changePage(1)"
              >
                صفحه بعد
              </button>
            </nav>
          </template>
        </section>

        <div
          v-else
          class="text-center py-12 text-gray-500 text-sm bg-gray-50 rounded-xl border border-dashed border-gray-200"
        >
          پرسش‌های متداول هنوز در این بخش منتشر نشده‌اند.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, onScopeDispose, reactive, ref, watch } from "vue";
import { Wallet, BarChart2, Calendar, UserCheck } from "lucide-vue-next";

definePageMeta({ middleware: "auth", layout: "panel" });

const { $api } = useNuxtApp();
const base = "/front/club"; // $api خودش /api/v1 را به مسیر اضافه می‌کند.
const activeTab = ref("club");
const clubTabs = [
  { id: "club", title: "سرمه کلاب" },
  { id: "rewards", title: "جایزه‌های دریافتی" },
  { id: "history", title: "تاریخچه سکه‌های دریافتی" },
  { id: "faq", title: "پرسش‌های متداول" },
];

// جدول عمومی سطح‌بندی، مطابق طرح فعلی؛ سطح فعال از summary دریافت می‌شود.
const tiers = [
  {
    id: "bronze",
    label: "سطح برنز",
    icon: "/icons/coinB.svg",
    range: "(۰ تا ۵۰۰)",
    discount: "۲٪",
    shipping: "–",
  },
  {
    id: "gold",
    label: "سطح گلد",
    icon: "/icons/coin.png",
    range: "(۵۰۰ تا ۱۰۰۰)",
    discount: "۳٪",
    shipping: "یک ارسال رایگان در ماه",
  },
  {
    id: "platinum",
    label: "سطح پلاتینیوم",
    icon: "/icons/coinN.svg",
    range: "(۱۰۰۰ تا ۲۰۰۰)",
    discount: "۴٪",
    shipping: "دو ارسال رایگان در ماه",
  },
];
const tierRows = [
  { field: "range", label: "تعداد سکه مورد نیاز" },
  { field: "discount", label: "درصد تخفیف" },
  { field: "shipping", label: "حمل و نقل" },
];
const missions = [
  {
    id: "beauty",
    title: "تکمیل پروفایل بیوتی",
    description: "پروفایل بیوتی خود را تکمیل کنید.",
    to: "/panel/beauty-profile",
    action: "تکمیل کنید",
  },
  {
    id: "personal",
    title: "تکمیل اطلاعات شخصی",
    description:
      "اطلاعات شخصی خود را از بخش اطلاعات کاربری مشاهده یا ویرایش کنید.",
    to: "/panel",
    action: "مشاهده اطلاعات",
  },
];
const sourceLabels = {
  order: "سفارش",
  posOrder: "خرید حضوری",
  profile: "پروفایل",
  manual: "ثبت دستی",
  mission: "ماموریت",
  reversal: "برگشت امتیاز",
};
const benefitLabels = {
  discount: "تخفیف سفارش",
  free_shipping: "ارسال رایگان",
};
const listConfig = {
  history: {
    endpoint: "transactions",
    title: "تاریخچه سکه‌ها",
    empty: "هنوز تراکنش سکه‌ای ثبت نشده است.",
  },
  rewards: {
    endpoint: "usagesFront",
    title: "مزایای استفاده‌شده باشگاه",
    empty: "هنوز از مزایای باشگاه استفاده نکرده‌اید.",
  },
};

const createResource = () => ({
  data: null,
  status: "idle",
  error: "",
  requestedPage: 1,
});
const summary = reactive(createResource());
const shipping = reactive(createResource());
const beautySelections = reactive(createResource());
const lists = reactive({
  history: createResource(),
  rewards: createResource(),
});
const activeList = computed(() => lists[activeTab.value] ?? null);
const currentTier = computed(() =>
  tiers.find((tier) => tier.id === summary.data?.level),
);
const tierLabel = (id) => tiers.find((tier) => tier.id === id)?.label ?? "—";
const isLoading = (resource) =>
  resource.status === "idle" || resource.status === "pending";

const numberFormatter = new Intl.NumberFormat("fa-IR");
const pointsFormatter = new Intl.NumberFormat("fa-IR", {
  signDisplay: "exceptZero",
});
const dateFormatter = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "Asia/Tehran",
});
const formatNumber = (value) =>
  value == null || !Number.isFinite(Number(value))
    ? "—"
    : numberFormatter.format(value);
const formatPoints = (value) =>
  value == null || !Number.isFinite(Number(value))
    ? "—"
    : pointsFormatter.format(value);
function formatDate(value) {
  if (!value) return "—";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "—" : dateFormatter.format(date);
}

const shippingLabel = computed(() => {
  // پاسخ endpoint اختصاصی اولویت دارد؛ summary فقط تا دریافت آن یا در صورت خطا استفاده می‌شود.
  const status =
    shipping.data ??
    (summary.data && {
      allowed: summary.data.can_use_free_shipping,
      remaining: summary.data.free_shipping_remaining,
    });
  if (!status)
    return isLoading(shipping) || isLoading(summary)
      ? "در حال بررسی…"
      : "نامشخص";
  const remaining = `${formatNumber(status.remaining)} ارسال باقی‌مانده در ماه جاری`;
  return status.allowed ? remaining : `در دسترس نیست (${remaining})`;
});

const abortController = new AbortController();
onScopeDispose(() => abortController.abort());

async function request(resource, path, validate, fallback, params) {
  if (resource.status === "pending" || abortController.signal.aborted) return;
  resource.status = "pending";
  resource.error = "";
  try {
    const { data } = await $api.get(path, {
      params,
      signal: abortController.signal,
    });
    if (abortController.signal.aborted) return;
    if (!validate(data)) throw new Error("Unexpected club API response");
    resource.data = data;
    resource.status = "success";
  } catch (error) {
    if (abortController.signal.aborted) return;
    resource.data = null;
    resource.status = "error";
    resource.error =
      error.response?.status === 401
        ? "برای دریافت اطلاعات باشگاه دوباره وارد حساب کاربری‌تان شوید."
        : fallback;
  }
}

const isSummary = (data) =>
  !!data &&
  Number.isFinite(data.total_points) &&
  typeof data.level === "string" &&
  Number.isFinite(data.discount_percent) &&
  Number.isInteger(data.free_shipping_remaining) &&
  typeof data.can_use_free_shipping === "boolean";
const isShipping = (data) =>
  !!data &&
  typeof data.allowed === "boolean" &&
  Number.isInteger(data.remaining);
const isPage = (data) =>
  !!data &&
  Array.isArray(data.data) &&
  Number.isInteger(data.current_page) &&
  data.current_page >= 1 &&
  Number.isInteger(data.last_page) &&
  data.last_page >= 1;

const loadSummary = () =>
  request(summary, `${base}/summary`, isSummary, "اطلاعات باشگاه دریافت نشد.");
const loadShipping = () =>
  request(
    shipping,
    `${base}/can-free-shipping`,
    isShipping,
    "وضعیت ارسال رایگان تأیید نشد.",
  );
// has_selections صرفاً وجود انتخاب ثبت‌شده را نشان می‌دهد، نه تکمیل مأموریت یا واریز سکه.
const loadBeautySelections = () =>
  request(
    beautySelections,
    "/specifications/my-selections",
    (data) =>
      data?.success === true && typeof data.has_selections === "boolean",
    "وضعیت انتخاب‌های پروفایل بیوتی دریافت نشد.",
  );

function loadList(tab, page = 1) {
  const config = listConfig[tab];
  const resource = lists[tab];
  if (!config || !resource || resource.status === "pending") return;
  if (
    !Number.isInteger(page) ||
    page < 1 ||
    (resource.data && page > resource.data.last_page)
  )
    return;
  resource.requestedPage = page;
  // URLهای paginator را دنبال نمی‌کنیم تا درخواست از همان proxy و interceptor بگذرد.
  return request(
    resource,
    `${base}/${config.endpoint}`,
    isPage,
    `${config.title} دریافت نشد.`,
    { page },
  );
}

function changePage(offset) {
  if (activeList.value?.status !== "success") return;
  return loadList(activeTab.value, activeList.value.data.current_page + offset);
}

onMounted(() => {
  // در پروژه فعلی توکن مرورگر از localStorage خوانده می‌شود.
  void loadSummary();
  void loadShipping();
  void loadBeautySelections();
  watch(
    activeTab,
    (tab) => {
      if (lists[tab]?.status === "idle") void loadList(tab);
    },
    { immediate: true },
  );
});
</script>
