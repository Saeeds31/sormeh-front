<template>
  <main class="flex flex-col container space-y-6">
    <!-- مسیر راهنما (Breadcrumb) -->
    <SharedBreadCrumb
      :items="[
        { label: 'صفحه اصلی', href: '/' },
        { label: 'قوانین و مقررات', href: '/rules-and-regulations' },
      ]"
    />

    <!-- کانتینر اصلی محتوای قوانین و مقررات -->
    <section
      class="bg-white rounded-2xl p-6 md:p-10 shadow-sm border border-gray-100 space-y-8 text-right"
    >
      <h1 class="text-xl md:text-2xl font-bold text-gray-900 border-b pb-6">
        قوانین و مقررات فروشگاه اینترنتی لوازم آرایشی و بهداشتی سرمه
      </h1>

      <p class="text-muted text-sm md:text-base leading-8">
        به فروشگاه ما خوش آمدید. ثبت سفارش و خرید از این فروشگاه به معنای مطالعه
        و پذیرش قوانین و مقررات زیر است. لطفاً پیش از ثبت سفارش، این موارد را
        مطالعه فرمایید.
      </p>

      <div class="space-y-6 text-gray-800">
        <!-- بند ۱ -->
        <div class="space-y-2">
          <h2 class="font-bold text-base md:text-lg text-gray-900">
            ۱. ثبت سفارش:
          </h2>
          <p class="text-muted text-sm md:text-base leading-7">
            مشتری موظف است هنگام ثبت سفارش، اطلاعات تماس، نشانی و مشخصات تحویل
            کالا را به‌صورت صحیح وارد کند. ثبت سفارش به معنای پذیرش قیمت و
            مشخصات درج‌شده برای محصول است.
          </p>
        </div>

        <!-- بند ۲ -->
        <div class="space-y-2">
          <h2 class="font-bold text-base md:text-lg text-gray-900">
            ۲. ارسال سفارش:
          </h2>
          <p class="text-muted text-sm md:text-base leading-7">
            مشتری موظف است هنگام ثبت سفارش، نشانی و شماره تماس معتبر وارد کند.
          </p>
        </div>

        <!-- بند ۳ -->
        <div class="space-y-2">
          <h2 class="font-bold text-base md:text-lg text-gray-900">
            ۳. ضمانت اصالت و سلامت کالا:
          </h2>
          <p class="text-muted text-sm md:text-base leading-7">
            فروشگاه متعهد است محصولات را مطابق مشخصات درج‌شده در صفحه هر کالا
            عرضه کند. مشتریان می‌توانند پیش از خرید، توضیحات محصول، ترکیبات،
            حجم، رنگ و سایر مشخصات آن را بررسی کنند.
          </p>
        </div>

        <!-- بند ۴ -->
        <div class="space-y-2">
          <h2 class="font-bold text-base md:text-lg text-gray-900">
            ۴. شرایط بازگشت و تعویض کالا:
          </h2>
          <p class="text-muted text-sm md:text-base leading-7">
            محصولات بازشده، استفاده‌شده یا فاقد شرایط بهداشتی، امکان بازگشت
            ندارند.<br />
            در صورت ارسال کالای اشتباه، مغایرت با سفارش یا وجود ایراد، موضوع پس
            از بررسی توسط پشتیبانی پیگیری خواهد شد.<br />
            لطفاً برای ثبت درخواست بازگشت یا تعویض، شماره سفارش و توضیحات مربوط
            به مشکل را از طریق راه‌های ارتباطی فروشگاه ارسال کنید.
          </p>
        </div>

        <!-- بند ۵ -->
        <div class="space-y-2">
          <h2 class="font-bold text-base md:text-lg text-gray-900">
            ۵. مسئولیت استفاده از محصولات:
          </h2>
          <p class="text-muted text-sm md:text-base leading-7">
            مشتری موظف است دستورالعمل مصرف، ترکیبات و هشدارهای درج‌شده روی محصول
            را مطالعه کند.<br />
            در صورت داشتن حساسیت پوستی یا سابقه واکنش به ترکیبات خاص، بررسی
            ترکیبات محصول پیش از مصرف توصیه می‌شود.<br />
            مسئولیت استفاده صحیح از محصول مطابق دستورالعمل تولیدکننده بر عهده
            مصرف‌کننده است.
          </p>
        </div>

        <!-- بند ۶ -->
        <div class="space-y-2">
          <h2 class="font-bold text-base md:text-lg text-gray-900">
            ۶. حفظ حریم خصوصی:
          </h2>
          <p class="text-muted text-sm md:text-base leading-7">
            اطلاعات مشتریان صرفاً در چارچوب اهداف مرتبط با ثبت، پردازش و ارسال
            سفارش، پشتیبانی و سایر موارد اعلام‌شده در سیاست حفظ حریم خصوصی
            استفاده می‌شود.<br />
            اطلاعات مشتریان بدون مبنای قانونی یا رضایت لازم، در اختیار اشخاص
            ثالث قرار نخواهد گرفت؛ مگر در موارد ضروری برای انجام سفارش یا مواردی
            که قانون اجازه داده یا الزامی کرده است.
          </p>
        </div>

        <!-- بند ۷ -->
        <div class="space-y-2">
          <h2 class="font-bold text-base md:text-lg text-gray-900">
            ۷. پشتیبانی و رسیدگی به شکایات:
          </h2>
          <p class="text-muted text-sm md:text-base leading-7">
            مشتریان می‌توانند پرسش‌ها، درخواست‌های پیگیری، گزارش مغایرت یا شکایت
            خود را از طریق راه‌های ارتباطی درج‌شده در سایت با پشتیبانی فروشگاه
            مطرح کنند.
          </p>
        </div>
      </div>

      <p class="text-gray-900 font-medium pt-4 border-t">
        از اعتماد شما به فروشگاه ما سپاسگزاریم.
      </p>
    </section>

    <!-- بخش پایین: جدیدترین محصولات ترند (متصل به API خانه / is_trends) -->
    <section class="my-16 space-y-6">
      <!-- هدر بخش ترند مطابق طرح -->
      <!-- <div class="flex items-center justify-between gap-3">
        <div class="flex items-center gap-3 order-1">
          <h2
            class="text-xl md:text-2xl font-bold text-gray-900 border-r-4 border-[#3F2356] pr-3 leading-none"
          >
            جدیدترین محصولات ترند
          </h2>
        </div>
        <div class="flex-1 h-[1px] bg-gray-200 hidden sm:block order-2"></div>

        <div class="flex items-center gap-2 order-3">
          <button
            type="button"
            @click="scrollRight"
            class="w-9 h-9 rounded-lg bg-[#EAE2F3] hover:bg-[#3F2356] hover:text-white flex items-center justify-center transition-colors cursor-pointer shadow-sm"
            aria-label="Previous"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-4 h-4 stroke-current fill-none"
              viewBox="0 0 24 24"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
          <button
            type="button"
            @click="scrollLeft"
            class="w-9 h-9 rounded-lg bg-[#EAE2F3] hover:bg-[#3F2356] hover:text-white flex items-center justify-center transition-colors cursor-pointer shadow-sm"
            aria-label="Next"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-4 h-4 stroke-current fill-none"
              viewBox="0 0 24 24"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          </button>
        </div>
      </div> -->
      <SharedSectionSliderHeader
        :title-parts="[
          { text: 'محصولات', class: 'text-gray-900' },
          { text: ' محصولات ترند', class: 'font-normal text-strong' },
        ]"
        @next="scrollRight"
        @prev="scrollLeft"
      />

      <!-- لودینگ -->
      <div
        v-if="pending"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse"
      >
        <div v-for="n in 4" :key="n" class="h-80 bg-gray-200 rounded-2xl" />
      </div>

      <!-- اسلایدر محصولات ترند -->
      <div
        v-else-if="trendProducts && trendProducts.length > 0"
        ref="sliderContainer"
        class="flex gap-4 overflow-x-auto scroll-smooth pb-4 no-scrollbar snap-x snap-mandatory"
        style="scrollbar-width: none; -ms-overflow-style: none"
      >
        <div
          v-for="product in trendProducts"
          :key="product.id"
          class="min-w-[260px] sm:min-w-[280px] lg:min-w-[300px] flex-1 snap-start"
        >
          <SharedProductCard :product="product" />
        </div>
      </div>

      <div v-else class="text-center py-12 text-muted">
        محصول ترندی برای نمایش وجود ندارد.
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, computed } from "vue";
import { useHomeStore } from "@/store/home";
import { useApi } from "@/composables/api/useApi";

const homeStore = useHomeStore();
const { getHome } = useApi();

// مرجع به کانتینر محصولات برای اسکرول افقی دکمه‌ها
const sliderContainer = ref(null);

const scrollLeft = () => {
  if (sliderContainer.value) {
    sliderContainer.value.scrollBy({ left: -320, behavior: "smooth" });
  }
};

const scrollRight = () => {
  if (sliderContainer.value) {
    sliderContainer.value.scrollBy({ left: 320, behavior: "smooth" });
  }
};

// بارگذاری داده‌های صفحه اصلی جهت دسترسی به is_trends
const { pending, data: homeData } = await useAsyncData(
  "rules-home-data",
  async () => {
    if (homeStore.home) return homeStore.home;
    const response = await getHome();
    const fetchedData = response?.data?.data || response?.data;
    homeStore.setHome(fetchedData);
    return fetchedData;
  },
);

const home = computed(() => homeStore.home || homeData.value);
const trendProducts = computed(() => home.value?.is_trends || []);
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
