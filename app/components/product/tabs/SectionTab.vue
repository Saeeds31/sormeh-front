<!-- app/components/product/tabs/SectionTab.vue -->
<!-- <template>
  <div class="w-full" dir="rtl">
    <div
      class="flex justify-center md:justify-center gap-2 bg-[#e9e3f5] px-2 rounded-xl w-full pt-4 mb-6 pb-20"
    >
      <button
        @click="activeTab = 'text'"
        :class="['tab-button', { active: activeTab === 'text' }]"
      >
        توضیحات
      </button>
      <button
        v-if="props.specifications && props.specifications.length"
        @click="activeTab = 'specifications'"
        :class="['tab-button', { active: activeTab === 'specifications' }]"
      >
        ویژگی ها
      </button>
      <button
        @click="activeTab = 'comment'"
        :class="['tab-button', { active: activeTab === 'comment' }]"
      >
        نظرات
      </button>
    </div>
    <div
      class="bg-white md:w-[80%] relative -top-22 mx-auto border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm"
    >
      <div class="tabs-content">
        <transition name="fade" mode="out-in">
          <div v-if="activeTab === 'text'" key="text" class="tab-panel">
            <productTabsInformation :description="props.description" />
          </div>

          <div
            v-else-if="activeTab == 'comment'"
            key="comment"
            class="tab-panel"
          >
            <productTabsComment :comments="comments" />
          </div>

          <ul
            v-else-if="activeTab == 'specifications'"
            key="specifications"
            class="tab-panel mt-4"
          >
            <li
              v-for="(item, index) in props.specifications"
              :key="index"
              class="grid grid-cols-[250px_1fr]"
            >
              <span class="bg-gray-300 px-4 py-3">{{ item.title }}</span>
              <span class="bg-gray-100 px-4 py-3">{{
                item.values ? item.values.map((it) => it.value).join(" , ") : ""
              }}</span>
            </li>
          </ul>
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { toast } from "vue3-toastify";

const props = defineProps({
  specifications: Array,
  description: {
    type: String,
    default: "",
  },
  comments: {
    type: Object,
    default: null,
  },
});
const activeTab = ref("text");
const textContent = ref("");

const commentForm = ref({
  name: "",
  email: "",
  comment: "",
  saveInfo: false,
});

const comments = ref([]);

const clearText = () => {
  const shouldClear = confirm("آیا مطمئن هستید که می‌خواهید متن را پاک کنید؟");
  if (shouldClear) {
    textContent.value = "";
  }
};

const submitComment = () => {
  const newComment = {
    name: commentForm.value.name,
    email: commentForm.value.email,
    comment: commentForm.value.comment,
    date: new Date().toLocaleDateString("fa-IR"),
  };

  comments.value.unshift(newComment);

  commentForm.value.comment = "";
  if (!commentForm.value.saveInfo) {
    commentForm.value.name = "";
    commentForm.value.email = "";
  }

  toast.success("نظر شما با موفقیت ثبت شد!");
};
</script>

<style scoped>
.tab-button {
  padding: 10px 12px;
  border-radius: 8px;
}

.tab-button.active {
  background-color: var(--bg-secondary);
  color: var(--bg-primary);
}
</style> -->

<template>
  <div class="w-full relative" dir="rtl">
    <!-- هدر تب‌ها: در موبایل استیکی، در دسکتاپ استایل کلاسیک -->
    <div
      ref="tabsHeader"
      class="sticky top-[56px] md:static z-40 flex justify-center gap-2 bg-[#e9e3f5] px-2 pt-3 md:pt-4 pb-1.5 md:pb-20 md:rounded-xl w-full mb-6 md:mb-0 shadow-sm md:shadow-none backdrop-blur-md md:backdrop-blur-none container"
    >
      <button
        @click="handleTabClick('text')"
        :class="['tab-button', { active: activeTab === 'text' }]"
      >
        توضیحات
      </button>

      <button
        v-if="props.specifications && props.specifications.length"
        @click="handleTabClick('specifications')"
        :class="['tab-button', { active: activeTab === 'specifications' }]"
      >
        ویژگی ها
      </button>

      <button
        @click="handleTabClick('comment')"
        :class="['tab-button', { active: activeTab === 'comment' }]"
      >
        نظرات
      </button>

      <!-- تب محصولات مرتبط فقط در موبایل -->
      <button
        @click="handleTabClick('related')"
        :class="['tab-button md:hidden', { active: activeTab === 'related' }]"
      >
        محصولات مرتبط
      </button>
    </div>

    <!-- محتوای تب‌ها -->
    <div
      class="bg-white md:w-[80%] md:relative md:-top-16 mx-auto border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm"
    >
      <div class="tabs-content">
        <!-- در دسکتاپ طبق روال قبل با transition، در موبایل پشت سر هم برای اسکرول پیوسته -->
        <div class="hidden md:block">
          <transition name="fade" mode="out-in">
            <!-- توضیحات دسکتاپ -->
            <div v-if="activeTab === 'text'" key="text" class="tab-panel">
              <h3
                class="text-xl font-bold text-gray-900 mb-2 border-r-4 border-[#3F2356] pr-3 leading-none"
              >
                توضیحات محصول
              </h3>
              <productTabsInformation :description="props.description" />
            </div>

            <!-- نظرات دسکتاپ -->
            <div
              v-else-if="activeTab === 'comment'"
              key="comment"
              class="tab-panel"
            >
              <h3
                class="text-xl font-bold text-gray-900 mb-2 border-r-4 border-[#3F2356] pr-3 leading-none"
              >
                نظرات کاربران
              </h3>
              <productTabsComment
                :comments="comments"
                :comment-form="commentForm"
                @submit-comment="submitComment"
              />
            </div>

            <!-- ویژگی‌ها دسکتاپ -->
            <div
              v-else-if="activeTab === 'specifications'"
              key="specifications"
              class="tab-panel"
            >
              <h3
                class="text-xl font-bold text-gray-900 mb-2 border-r-4 border-[#3F2356] pr-3 leading-none"
              >
                مشخصات فنی و ویژگی‌ها
              </h3>
              <ul class="space-y-0">
                <li
                  v-for="(item, index) in props.specifications"
                  :key="index"
                  class="grid grid-cols-[250px_1fr] border-b border-gray-100"
                >
                  <span class="bg-gray-300 px-4 py-3">
                    {{ item.title }}
                  </span>
                  <span class="bg-gray-100 px-4 py-3">
                    {{
                      item.values
                        ? item.values.map((it) => it.value).join(" , ")
                        : ""
                    }}
                  </span>
                </li>
              </ul>
            </div>
          </transition>
        </div>

        <!-- حالت موبایل: هر ۴ بخش پشت سر هم و اسکرول‌پذیر -->
        <div class="md:hidden flex flex-col gap-8">
          <!-- بخش ۱: توضیحات -->
          <div id="mob-section-text" class="scroll-section">
            <h3 class="text-base font-bold text-gray-800 text-right">
              توضیحات
            </h3>
            <productTabsInformation :description="props.description" />
          </div>

          <!-- بخش ۲: ویژگی‌ها -->
          <div
            v-if="props.specifications && props.specifications.length"
            id="mob-section-specifications"
            class="scroll-section pt-4 border-t border-gray-100"
          >
            <h3 class="text-base font-bold text-gray-800 text-right">
              ویژگی‌ها
            </h3>
            <ul class="space-y-2">
              <li
                v-for="(item, index) in props.specifications"
                :key="index"
                class="grid grid-cols-1 border-b border-gray-100 pb-2"
              >
                <span
                  class="bg-gray-300 px-3 py-2 rounded-lg text-sm font-bold"
                >
                  {{ item.title }}
                </span>
                <span class="bg-gray-100 px-3 py-2 rounded-lg text-sm mt-1">
                  {{
                    item.values
                      ? item.values.map((it) => it.value).join(" , ")
                      : ""
                  }}
                </span>
              </li>
            </ul>
          </div>

          <!-- بخش ۳: نظرات -->
          <div
            id="mob-section-comment"
            class="scroll-section pt-4 border-t border-gray-100"
          >
            <h3 class="text-base font-bold text-gray-800 text-right">نظرات</h3>
            <productTabsComment
              :comments="comments"
              :comment-form="commentForm"
              @submit-comment="submitComment"
            />
          </div>

          <!-- بخش ۴: محصولات مرتبط -->
          <div
            id="mob-section-related"
            class="scroll-section pt-4 border-t border-gray-100"
          >
            <h3 class="mb-4 text-base font-bold text-gray-800 text-right">
              محصولات مرتبط
            </h3>
            <div class="flex flex-col gap-3">
              <div
                v-for="(product, index) in props.similarProducts"
                :key="'mobile-rel-' + (product.id ?? index)"
                class="bg-white border border-gray-200 rounded-2xl p-2 flex flex-col justify-between relative shadow-xs"
              >
                <NuxtLink
                  :to="`/product/${product.id}`"
                  :aria-label="product.title || 'مشاهده محصول'"
                  class="absolute inset-0 z-10 rounded-2xl"
                />
                <div class="flex items-start justify-between gap-2">
                  <div
                    class="w-20 sm:w-24 h-20 sm:h-24 shrink-0 relative bg-gray-50 rounded-xl overflow-hidden flex items-center justify-center border border-gray-100"
                  >
                    <SharedAppImage
                      v-if="getProductImage(product)"
                      :src="getProductImage(product)"
                      :alt="product.title || 'محصول'"
                      format="webp"
                      loading="lazy"
                      class="w-full h-full"
                      img-class="w-full h-full object-cover"
                    />
                  </div>
                  <div
                    class="flex-1 flex items-start justify-between gap-2 min-w-0"
                  >
                    <span
                      class="text-sm sm:text-base font-bold text-gray-900 line-clamp-2 leading-relaxed text-right hover:text-purple-900 transition-colors pt-2"
                    >
                      {{ product.title || product.name || "عنوان محصول" }}
                    </span>
                    <button
                      type="button"
                      class="relative z-20 text-gray-400 hover:text-red-500 transition-colors p-1 shrink-0"
                      aria-label="علاقه‌مندی"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-5 h-5"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <div
                  class="flex items-center justify-between gap-2 mt-2 border-gray-100 bg-gray-50/70 p-2 rounded-xl"
                >
                  <span class="relative z-20 btn !text-sm !px-3">
                    افزودن به سبد خرید
                  </span>
                  <div class="flex flex-col items-start min-w-0">
                    <template v-if="product.status !== 'unpublished'">
                      <span
                        v-if="hasDiscount(product)"
                        class="text-sm text-gray-400 line-through leading-tight"
                      >
                        {{ formatPrice(getOriginalPrice(product)) }}
                      </span>
                      <span
                        class="text-sm sm:text-base font-bold text-gray-900 whitespace-nowrap"
                      >
                        {{ formatPrice(getFinalPrice(product)) }}
                        <span class="text-xs font-normal text-gray-600"
                          >تومان</span
                        >
                      </span>
                    </template>
                    <span v-else class="text-xs font-bold text-red-600"
                      >ناموجود</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- دسکتاپ: هدر و اسلایدر اصلی پروژه؛ کارت‌ها از HomeOfferSlider می‌آیند -->
    <section
      v-if="props.similarProducts.length"
      class="hidden md:block container mx-auto mt-12"
    >
      <div class="mb-6">
        <SharedSectionSliderHeader
          :title-parts="[
            { text: 'محصولات ', class: 'text-gray-900' },
            { text: 'مرتبط', class: 'font-normal text-strong' },
          ]"
          :show-arrows="true"
          divider-visible-class="!block"
          @prev="moveDesktopSlider('prev')"
          @next="moveDesktopSlider('next')"
        />
      </div>

      <!-- حفظ کامپوننت اصلی: کارت‌های عمودی دسکتاپ در خود این کامپوننت هستند -->
      <HomeSlidersHomeOfferSlider
        ref="desktopOfferSlider"
        :products="props.similarProducts"
      />
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from "vue";
import { toast } from "vue3-toastify";

const props = defineProps({
  specifications: Array,
  description: {
    type: String,
    default: "",
  },
  comments: {
    type: Object,
    default: null,
  },
  similarProducts: {
    type: Array,
    default: () => [],
  },
});

const { $getImageUrl } = useNuxtApp();

const activeTab = ref("text");
const tabsHeader = ref(null);

let isUserScrollingByClick = false;
let scrollTimeout = null;

const mobileSectionIds = ["text", "specifications", "comment", "related"];

// فاصله واقعی زیر هدر استیکی؛ به‌جای عدد ثابت ۱۱۵ یا ۱۳۰
const getHeaderOffset = () => {
  const header = tabsHeader.value;
  if (!header) return 115;

  const stickyTop = parseFloat(window.getComputedStyle(header).top);

  return (
    (Number.isFinite(stickyTop) ? stickyTop : 56) +
    header.getBoundingClientRect().height +
    12
  );
};

// تشخیص تب فعال با مختصات نسبت به viewport، نه offsetTop
const handleScrollSpy = () => {
  if (isUserScrollingByClick || window.innerWidth >= 768) return;

  const sections = mobileSectionIds
    .map((id) => ({
      id,
      el: document.getElementById(`mob-section-${id}`),
    }))
    .filter((section) => section.el);

  if (!sections.length) return;

  const activationLine = getHeaderOffset();
  let currentSection = sections[0].id;

  for (const section of sections) {
    if (section.el.getBoundingClientRect().top <= activationLine) {
      currentSection = section.id;
    } else {
      break;
    }
  }

  // اگر آخر صفحه اجازه ندهد بخش آخر دقیقاً زیر هدر قرار بگیرد
  const lastSection = sections[sections.length - 1];
  const lastRect = lastSection.el.getBoundingClientRect();
  const atPageBottom =
    window.scrollY + window.innerHeight >=
    document.documentElement.scrollHeight - 2;

  if (
    atPageBottom &&
    lastRect.top < window.innerHeight &&
    lastRect.bottom > 0
  ) {
    currentSection = lastSection.id;
  }

  if (activeTab.value !== currentSection) {
    activeTab.value = currentSection;
  }
};

// تشخیص خودکار را پس از توقف اسکرول دوباره فعال کن
const scheduleScrollSpyUnlock = () => {
  clearTimeout(scrollTimeout);

  scrollTimeout = setTimeout(() => {
    isUserScrollingByClick = false;
    handleScrollSpy();
  }, 180);
};

// دسکتاپ: تغییر محتوا؛ موبایل: اسکرول تا بخش انتخاب‌شده
const handleTabClick = (tabName) => {
  activeTab.value = tabName;

  if (process.client && window.innerWidth < 768) {
    const el = document.getElementById(`mob-section-${tabName}`);
    if (!el) return;

    isUserScrollingByClick = true;

    const topOffset =
      window.scrollY + el.getBoundingClientRect().top - getHeaderOffset();

    window.scrollTo({
      top: Math.max(0, topOffset),
      behavior: "smooth",
    });

    scheduleScrollSpyUnlock();
  }
};

const handleScroll = () => {
  if (isUserScrollingByClick) {
    scheduleScrollSpyUnlock();
    return;
  }

  handleScrollSpy();
};

onMounted(async () => {
  await nextTick();
  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScrollSpy();
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
  clearTimeout(scrollTimeout);
});

const textContent = ref("");

const commentForm = ref({
  name: "",
  email: "",
  comment: "",
  saveInfo: false,
});

const comments = ref([]);

const desktopOfferSlider = ref(null);

/**
 * کنترل فلش‌های هدر:
 * ابتدا تلاش می‌کند اسلایدر Swiper داخلی را کنترل کند؛
 * اگر کامپوننت از اسکرول native استفاده کند، همان کانتینر را اسکرول می‌کند.
 */
const moveDesktopSlider = (direction) => {
  const component = desktopOfferSlider.value;
  const root = component?.$el ?? component;

  if (!root) return;

  const swiperElements = [
    ...(root.matches?.(".swiper") ? [root] : []),
    ...(root.querySelectorAll?.(".swiper") ?? []),
  ];

  const swiperElement = swiperElements.find((element) => element.swiper);

  if (swiperElement?.swiper) {
    if (direction === "prev") {
      swiperElement.swiper.slidePrev();
    } else {
      swiperElement.swiper.slideNext();
    }
    return;
  }

  const elements = [root, ...(root.querySelectorAll?.("*") ?? [])];

  const scrollableElement = elements.find((element) => {
    if (element.scrollWidth <= element.clientWidth + 1) return false;

    const overflowX = window.getComputedStyle(element).overflowX;
    return overflowX === "auto" || overflowX === "scroll";
  });

  if (scrollableElement) {
    scrollableElement.scrollBy({
      left: direction === "prev" ? -320 : 320,
      behavior: "smooth",
    });
  }
};

const submitComment = () => {
  const newComment = {
    name: commentForm.value.name,
    email: commentForm.value.email,
    comment: commentForm.value.comment,
    date: new Date().toLocaleDateString("fa-IR"),
  };

  comments.value.unshift(newComment);
  commentForm.value.comment = "";

  if (!commentForm.value.saveInfo) {
    commentForm.value.name = "";
    commentForm.value.email = "";
  }

  toast.success("نظر شما با موفقیت ثبت شد!");
};

const getProductImage = (product) => {
  const img =
    product?.main_image ||
    product?.image ||
    (Array.isArray(product?.images) ? product.images[0] : null);

  if (!img) return "";

  if (
    typeof img === "string" &&
    (img.startsWith("http://") || img.startsWith("https://"))
  ) {
    return img;
  }

  return $getImageUrl ? $getImageUrl(img) : `/storage/${img}`;
};

const getOriginalPrice = (product) => Number(product?.price || 0);

const getFinalPrice = (product) =>
  Number(product?.final_price ?? product?.sale_price ?? product?.price ?? 0);

const hasDiscount = (product) =>
  getOriginalPrice(product) > getFinalPrice(product);

const formatPrice = (val) =>
  !val && val !== 0 ? "۰" : Number(val).toLocaleString("fa-IR");
</script>

<style scoped>
.tab-button {
  background: var(--bg-secondary-fade);
  padding: 10px 12px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.tab-button.active {
  background-color: var(--bg-secondary);
  color: var(--bg-primary);
}
</style>
