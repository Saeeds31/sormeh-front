<script setup>
import { ref } from "vue";
import Frame from "../icon/Frame.vue";

defineProps({
  faqs: {
    type: Array,
    default: () => [
      {
        title: "سوالات متداول",
        items: [
          {
            question:
              "۱. چگونه از اصل بودن لوازم آرایشی و مراقبتی در سرمه آنلاین مطمئن شویم؟",
            answer:
              "اصالت کالا خط قرمز ماست. تمامی محصولات گالری سرمه مستقیماً از نمایندگان معتبر جهانی تامین می‌شوند و دارای پلمپ کارخانه‌ای، لیبل اصالت و بچ‌کد (Batch Code) معتبر هستند. شما می‌توانید بچ‌کد تمامی عطرها، کرم‌پودرها و محصولات مراقبتی را در سایت‌های معتبر بین‌المللی استعلام بگیرید تا از ۱۰۰٪ اورجینال بودن آن‌ها مطمئن شوید.",
          },
          {
            question: "۲. آیا امکان تست رنگ محصولات و خرید حضوری هم وجود دارد؟",
            answer:
              "بله، با کمال میل! ما می‌دانیم که انتخاب تناژ دقیق کرم‌پودر، کوشن یا تست رایحه عطر نیازمند بررسی از نزدیک است. شما می‌توانید به شعبه فیزیکی ما واقع در گرگان، نبش گلشهر ۲ مراجعه کنید، از تسترها استفاده نمایید و با خیالی آسوده خرید خود را انجام دهید.",
          },
          {
            question:
              "۳. من نوع پوست خود را نمی‌شناسم؛ آیا برای انتخاب روتین پوستی مشاوره می‌دهید؟",
            answer:
              "قطعاً تیم مشاوران تخصصی سرمه با سال‌ها تجربه در زمینه مراقبت پوست و مو، آماده‌اند تا با بررسی دقیق وضعیت پوست شما (خشک، چرب، مستعد آکنه یا حساس)، بهترین شوینده‌ها، آبرسان‌ها، سرم‌های درمانی و ضدآفتاب‌ها را به شما معرفی کنند. این مشاوره هم به صورت حضوری در فروشگاه و هم از طریق پشتیبانی آنلاین سایت امکان‌پذیر است.",
          },
          {
            question:
              "۴. نحوه ارسال سفارشات آنلاین به چه صورت است و چقدر زمان می‌برد؟",
            answer:
              "تمامی سفارشات ثبت‌شده در سایت، با ایمن‌ترین بسته‌بندی حباب‌دار (برای جلوگیری از آسیب به شیشه‌های عطر یا پالت‌های آرایشی) آماده‌سازی شده و از طریق پست پیشتاز به سراسر ایران ارسال می‌گردند. زمان تحویل سفارشات معمولاً بین ۳ تا ۵ روز کاری است.",
          },
          {
            question:
              "۵. تاریخ انقضای محصولات در فروشگاه سرمه چگونه کنترل می‌شود؟",
            answer:
              "تمامی سفارشات ثبت‌شده در سایت، با ایمن‌ترین بسته‌بندی حباب‌دار (برای جلوگیری از آسیب به شیشه‌های عطر یا پالت‌های آرایشی) آماده‌سازی شده و از طریق پست پیشتاز به سراسر ایران ارسال می‌گردند. زمان تحویل سفارشات معمولاً بین ۳ تا ۵ روز کاری است.",
          },
          {
            question: "۶. روش‌های پرداخت در سایت سرمه آنلاین به چه صورت است؟",
            answer:
              "تمامی پرداخت‌ها در سایت سرمه آنلاین از طریق درگاه‌های امن و معتبر بانکی (با استفاده از تمامی کارت‌های عضو شتاب) انجام می‌شود. این کار باعث می‌شود سفارش شما در سریع‌ترین زمان ممکن تایید شده و در مسیر بسته‌بندی و ارسال پستی قرار گیرد. همچنین مشتریان عزیز ساکن گرگان می‌توانند با مراجعه مستقیم به فروشگاه ما واقع در نبش گلشهر ۲، محصولات را از نزدیک انتخاب کرده و پرداخت خود را به صورت حضوری انجام دهند.",
          },
        ],
      },
    ],
  },
});

const openFaq = ref(0);
const toggleFaq = (index) => {
  openFaq.value = openFaq.value === index ? -1 : index;
};
</script>

<template>
  <section v-if="faqs && faqs.length" class="flex flex-col w-full space-y-6">
    <div
      v-for="(faqGroup, gIdx) in faqs"
      :key="gIdx"
      class="flex flex-col space-y-6 text-right"
    >
      <!-- سربرگ مطابق طرح جدید -->
      <div class="relative mb-2 flex items-center justify-between mb-6">
        <!-- عنوان در سمت راست -->
        <div class="relative z-10 bg-white pr-4">
          <h2
            class="flex items-center gap-2 text-lg lg:text-xl font-bold text-strong pl-2"
          >
            <span class="inline-block h-6 w-[2px] rounded-full bg-[#4a2e56]" />
            {{ faqGroup.title || "سوالات متداول" }}
          </h2>
        </div>

        <!-- خط افقی سراسری -->
        <div
          class="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-gray-200"
        />

        <!-- آیکون در سمت چپ -->
        <div class="relative z-10 bg-white pr-6 text-[#4a2e56]">
          <Frame />
        </div>
      </div>

      <!-- لیست آکاردئون‌ها -->
      <div class="space-y-4">
        <div
          v-for="(item, idx) in faqGroup.items || []"
          :key="idx"
          class="bg-white rounded-2xl border border-purple-200 transition-all duration-200 overflow-hidden shadow-sm hover:border-gray-300"
          :class="openFaq === idx ? '!border-r-4 !border-r-purple-300' : ''"
        >
          <button
            type="button"
            class="w-full p-5 lg:p-6 flex items-start justify-between gap-4 text-right cursor-pointer select-none bg-white"
            @click="toggleFaq(idx)"
          >
            <!-- عنوان سوال در سمت راست -->
            <div class="flex-1 text-right">
              <span class="text-sm lg:text-base font-bold text-gray-900">
                {{ item.question }}
              </span>

              <!-- متن پاسخ با ترنزیشن نرم -->
              <transition
                enter-active-class="transition-all duration-300 ease-out"
                leave-active-class="transition-all duration-200 ease-in"
                enter-from-class="opacity-0 max-h-0 pt-0"
                enter-to-class="opacity-100 max-h-40 pt-3"
                leave-from-class="opacity-100 max-h-40 pt-3"
                leave-to-class="opacity-0 max-h-0 pt-0"
              >
                <p
                  v-show="openFaq === idx"
                  class="text-xs lg:text-sm text-gray-600 leading-7 font-normal overflow-hidden pt-5 text-right"
                >
                  {{ item.answer }}
                </p>
              </transition>
            </div>

            <!-- دکمه فلش با استفاده از آیکن project arrow.svg -->
            <span
              class="flex items-center justify-center w-8 h-8 rounded-lg bg-[#F3E8FF] text-primary shrink-0 transition-transform duration-300"
              :class="{ 'rotate-180': openFaq === idx }"
            >
              <icon-arrow-bottom />
            </span>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
