<!-- app/components/about/FAQSection.vue -->
<template>
  <section class="py-6 font-sans container">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
      <div
        class="bg-[#D5CBEB] p-4 sm:p-8 rounded-2xl text-[#4B3073] shadow-sm flex flex-col justify-between h-full"
      >
        <div>
          <h2 class="mb-6 text-right text-lg font-bold text-[#34244a]">
            سوالات متداول
          </h2>

          <ul class="space-y-4">
            <li
              v-for="item in faqs"
              :key="item.id"
              class="bg-white rounded-xl border transition-all duration-300 overflow-hidden shadow-sm"
              :class="
                activeId === item.id
                  ? 'border-2 border-[#4B3073]'
                  : 'border-transparent'
              "
            >
              <button
                type="button"
                class="flex w-full items-center justify-between px-5 py-4 text-right text-sm md:text-base font-bold text-[#34244a] focus:outline-none"
                @click="toggle(item.id)"
              >
                <span
                  class="transition-colors"
                  :class="
                    activeId === item.id ? 'text-[#4B3073]' : 'text-gray-800'
                  "
                >
                  {{ item.question }}
                </span>

                <span
                  class="w-7 h-7 rounded-md bg-[#EBE5F5] text-[#4B3073] flex items-center justify-center transition-transform duration-300 shrink-0 mr-3"
                  :class="
                    activeId === item.id
                      ? 'rotate-180 bg-[#4B3073] text-white'
                      : ''
                  "
                >
                  <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </span>
              </button>

              <div
                v-show="activeId === item.id && item.answer"
                class="px-5 pb-5 text-xs md:text-sm leading-relaxed text-gray-600 border-t border-gray-100 pt-3 mt-1 text-right"
              >
                <p>{{ item.answer }}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div
        class="bg-[#D5CBEB] p-4 sm:p-8 rounded-2xl text-[#4B3073] flex flex-col justify-between shadow-sm h-full"
      >
        <div>
          <h2 class="mb-6 text-right text-lg font-bold text-[#34244a]">
            دریافت مشاوره آنلاین
          </h2>

          <form @submit.prevent="onSubmit" class="space-y-4">
            <div>
              <input
                v-model="form.name"
                type="text"
                placeholder="نام و نام خانوادگی"
                class="w-full bg-white border border-transparent rounded-xl px-5 py-3.5 text-sm md:text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#4B3073] transition placeholder-gray-400 text-right shadow-sm"
              />
            </div>

            <div>
              <input
                v-model="form.phone"
                type="tel"
                placeholder="شماره تماس"
                class="w-full bg-white border border-transparent rounded-xl px-5 py-3.5 text-sm md:text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#4B3073] transition placeholder-gray-400 text-right shadow-sm"
              />
            </div>

            <div>
              <textarea
                v-model="form.message"
                rows="5"
                placeholder="توضیحات..."
                class="w-full bg-white border border-transparent rounded-xl px-5 py-3.5 text-sm md:text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#4B3073] transition resize-none placeholder-gray-400 text-right shadow-sm"
              ></textarea>
            </div>

            <button
              type="submit"
              :disabled="loading"
              class="w-full bg-[#4B3073] text-white py-4 rounded-xl text-sm md:text-base font-bold hover:bg-[#34244a] transition shadow-md disabled:opacity-70 flex items-center justify-center"
            >
              <span v-if="loading" class="animate-pulse">در حال ارسال...</span>
              <span v-else>ارسال اطلاعات</span>
            </button>
          </form>
        </div>

        <div
          class="mt-8 pt-4 flex flex-col sm:flex-row items-center justify-between text-xs md:text-sm text-[#4B3073] font-medium gap-2 border-t border-[#4B3073]/20"
        >
          <span>شنبه تا پنجشنبه ۱۰:۰۰ صبح الی ۲۱:۰۰</span>
          <span class="font-bold">ما در دسترس هستیم</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { toast } from "vue3-toastify";

const form = ref({
  name: "",
  phone: "",
  message: "",
});

const loading = ref(false);

const onSubmit = () => {
  if (!form.value.name || !form.value.phone) {
    if (typeof toast !== "undefined" && toast.error) {
      toast.error("لطفاً نام و شماره تماس خود را وارد نمایید.");
    }
    return;
  }

  loading.value = true;
  setTimeout(() => {
    loading.value = false;
    if (typeof toast !== "undefined" && toast.success) {
      toast.success("درخواست مشاوره شما با موفقیت ثبت شد.");
    }
    form.value = { name: "", phone: "", message: "" };
  }, 1000);
};

// لیست سوالات متداول
const faqs = ref([
  {
    id: 1,
    question: "۱. آیا فروشگاه سرمه امکان خرید حضوری دارد و آدرس شعبه کجاست؟",
    answer:
      "بله، فروشگاه حضوری ما آماده خدمت‌رسانی به شما عزیزان است. جهت دریافت آدرس دقیق و ساعات کاری می‌توانید به بخش «تماس با ما» مراجعه نمایید.",
  },
  {
    id: 2,
    question:
      "۲. چگونه از اصالت و اورجینال بودن محصولات فروشگاه سرمه مطمئن شوم؟",
    answer:
      "تمامی محصولات موجود در سرمه دارای ضمانت ۱۰۰٪ اصالت کالا هستند. تمام اقلام آرایشی، بهداشتی و ادکلن‌ها مستقیماً از مبادی و نمایندگی‌های معتبر تأمین شده و دارای بچ‌کد (Batch Code) معتبر شرکتی جهت استعلام در سایت‌های جهانی اعتبارسنجی (مانند CheckCosmetic و CheckFresh) می‌باشند. در صورت هرگونه مغایرت، سلامت و اصالت سفارش شما به‌صورت کامل تضمین می‌شود.",
  },
  {
    id: 3,
    question: "۳. نحوه و مدت زمان ارسال سفارش‌ها به سراسر کشور چگونه است؟",
    answer:
      "سفارشات شما پس از پردازش، از طریق پست پیشتاز یا تیپاکس به سراسر کشور ارسال می‌گردد و معمولاً بین ۲ الی ۴ روز کاری به دستتان می‌رسد.",
  },
  {
    id: 4,
    question:
      "۴. آیا امکان دریافت مشاوره تخصصی پیش از خرید محصولات پوست و مو وجود دارد؟",
    answer:
      "بله، تیم مشاوران تخصصی ما از طریق فرم مشاوره آنلاین و شبکه‌های اجتماعی آماده راهنمایی شما در انتخاب بهترین محصولات متناسب با نوع پوست و موی شما هستند.",
  },
  {
    id: 5,
    question: "۵. شرایط مرجوعی یا بازگشت کالا در سرمه به چه صورت است؟",
    answer:
      "در صورت مغایرت کالا، مخدوش بودن پلمب یا ایرادات فنی، تا ۷ روز پس از تحویل امکان مرجوعی طبق ضوابط فروشگاه وجود دارد.",
  },
]);

const activeId = ref(null);

function toggle(id) {
  activeId.value = activeId.value === id ? null : id;
}
</script>
