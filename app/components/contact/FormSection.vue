<!-- app/components/Contact/FormSection.vue -->
<template>
  <section class="flex flex-col lg:flex-row-reverse items-center gap-12">
    <!-- فرم ارسال پیام و توضیحات (در سمت چپ) -->
    <div class="w-full lg:w-7/12 flex flex-col space-y-6 order-2 lg:order-1">
      <div class="space-y-2 text-right">
        <h2 class="text-2xl lg:text-3xl font-bold text-gray-900">
          ارتباط با ما
        </h2>
        <p class="text-sm md:text-base text-gray-600">
          تیم فروشگاه سرمه همیشه آماده شنیدن نظرات، انتقادات و پاسخگویی به
          سوالات شما عزیزان است.
        </p>
      </div>

      <form @submit.prevent="onSubmit" class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="flex flex-col gap-1.5 text-right">
            <label class="text-xs font-medium text-gray-700">
              نام <span class="text-red-500">*</span>
            </label>
            <input
              v-model="model.name"
              type="text"
              placeholder="نام"
              class="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary transition text-right"
            />
          </div>

          <div class="flex flex-col gap-1.5 text-right">
            <label class="text-xs font-medium text-gray-700"
              >نام خانوادگی</label
            >
            <input
              v-model="model.lastName"
              type="text"
              placeholder="نام خانوادگی"
              class="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary transition text-right"
            />
          </div>
        </div>

        <div class="flex flex-col gap-1.5 text-right">
          <label class="text-xs font-medium text-gray-700"
            >ایمیل (اختیاری)</label
          >
          <input
            v-model="model.email"
            type="email"
            placeholder="you@email.com"
            class="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary transition text-left font-sans"
          />
        </div>

        <div class="flex flex-col gap-1.5 text-right">
          <label class="text-xs font-medium text-gray-700">
            شماره تلفن <span class="text-red-500">*</span>
          </label>
          <div
            class="flex items-center bg-gray-50 border border-gray-200 rounded-lg overflow-hidden focus-within:border-primary transition"
          >
            <input
              v-model="model.phone"
              type="tel"
              placeholder="۰۹۱۱۲۳۴۵۶۷۸۹"
              class="w-full bg-transparent px-4 py-3 text-sm focus:outline-none text-left font-sans"
            />
            <div
              class="flex items-center px-3 border-r border-gray-200 text-xs text-gray-500 gap-1 bg-gray-100/50 py-3"
            >
              <span>IR</span>
              <span class="text-xs">▼</span>
            </div>
          </div>
        </div>

        <div class="flex flex-col gap-1.5 text-right">
          <label class="text-xs font-medium text-gray-700">
            پیام شما <span class="text-red-500">*</span>
          </label>
          <textarea
            v-model="model.message"
            rows="5"
            placeholder="متن پیام..."
            class="bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm focus:outline-none focus:border-primary transition resize-none text-right"
          ></textarea>
        </div>

        <div class="pt-2">
          <button
            type="submit"
            :disabled="loading"
            class="w-full bg-secondary text-white py-3.5 rounded-lg text-sm font-medium hover:opacity-95 transition shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <span v-if="loading">در حال ارسال...</span>
            <span v-else>ارسال پیام</span>
          </button>
        </div>
      </form>
    </div>

    <!-- بنر گرافیکی لوازم آرایشی (دقیقاً مطابق تصویر در سمت راست) -->
    <div class="w-full lg:w-5/12 flex justify-center order-1 lg:order-2">
      <div class="relative w-full rounded-2lg overflow-hidden">
        <SharedAppImage
          src="/images/contact-hero.svg"
          alt="Sormeh Online Contact"
          loading="eager"
          img-class="w-full h-auto object-cover"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  model: {
    type: Object,
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["submit"]);

const onSubmit = () => {
  emit("submit");
};
</script>
