<!-- app/components/about/StorySection.vue -->
<template>
  <section class="space-y-8 pt-6">
    <div class="relative mb-8 flex items-center justify-between">
      <!-- عنوان در سمت راست -->
      <div class="relative z-10 bg-white pr-4">
        <h2
          class="flex items-center gap-2 text-lg font-bold text-strong pl-2 lg:text-xl"
        >
          <span class="inline-block h-6 w-[2px] rounded-full bg-[#4a2e56]" />
          فروشگاه آنلاین سرمه
        </h2>
      </div>
      <!-- خط افقی -->
      <div
        class="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-gray-200"
      />

      <!-- آیکون ستاره در سمت چپ -->
      <div class="relative z-10 bg-white pr-6 text-[#4a2e56]">
        <IconFrame />
      </div>
    </div>

    <!-- ردیف اول: بنر نقل‌قول مدیر (عرض بیشتر) و عکس ضدآفتاب‌ها (عرض کمتر) -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
      <div
        class="lg:col-span-8 rounded-2xl overflow-hidden shadow-sm relative flex items-center bg-gray-50 border"
      >
        <SharedAppImage
          src="/images/about/quote-banner.svg"
          alt="نقل قول مدیریت گالری سرمه"
          fallback="/images/about/Group.svg"
          format="webp"
          class="w-full h-[154px] md:h-[235px] object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div
        class="lg:col-span-4 rounded-2xl overflow-hidden shadow-sm border border-gray-100 bg-gray-50 flex items-center"
      >
        <SharedAppImage
          src="/images/about/sunscreens.svg"
          alt="ضدآفتاب‌های معتبر گالری سرمه"
          fallback="/images/about/Group.svg"
          format="webp"
          class="w-full h-[154px] md:h-[235px] object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>
    </div>

    <!-- ردیف دوم: ادکلن‌ها و عطرها (عرض کمتر) و محصولات مراقبت پوستی (عرض بیشتر) -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
      <div
        class="lg:col-span-4 rounded-2xl overflow-hidden shadow-sm border border-gray-100 bg-gray-50 flex items-center"
      >
        <SharedAppImage
          src="/images/about/perfumes.svg"
          alt="کلکسیون عطر و ادکلن سرمه"
          fallback="/images/about/Group.svg"
          format="webp"
          class="w-full h-[154px] md:h-[235px] object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div
        class="lg:col-span-8 rounded-2xl overflow-hidden shadow-sm border border-gray-100 bg-gray-50 flex items-center"
      >
        <SharedAppImage
          src="/images/about/products-rose.svg"
          alt="محصولات مراقبت پوستی سرمه"
          fallback="/images/about/Group.svg"
          format="webp"
          class="w-full h-[154px] md:h-[235px] object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  title: { type: String, required: true },
  paragraphs: { type: Array, required: true },
  highlight: { type: String, default: "" },
  imageSrc: { type: String, required: true },
  imageAlt: { type: String, required: true },
  fallbackSrc: { type: String, default: "/images/contact/Group.svg" },
});
</script>
