<!-- app/components/about/HeroCollage.vue -->
<template>
  <section class="relative overflow-hidden pt-4">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
      <div class="lg:col-span-4 relative flex justify-center">
        <div
          class="relative w-full max-w-sm aspect-square overflow-hidden rounded-2xl"
        >
          <SharedAppImage
            :src="imageSrc"
            :alt="alt"
            :fallback="fallbackSrc"
            format="webp"
            class="w-full h-full object-cover"
          />
        </div>
      </div>

      <div class="lg:col-span-8 space-y-4 text-right">
        <div
          class="inline-block text-purple-900 rounded-full text-sm font-bold tracking-wide"
        >
          درباره سرمه
        </div>
        <h1 class="text-2xl lg:text-3xl font-bold leading-tight text-gray-900">
          تبدیل رویای زیبایی به واقعیتی درخشان
        </h1>
        <p class="text-muted text-sm md:text-base leading-8">
          به دنیای زیبایی و سلامت گالری سرمه خوش آمدید. داستان ما از دو دهه پیش
          در شهر زیبای گرگان آغاز شد؛ زمانی که با یک هدف ساده اما بزرگ پا به این
          عرصه گذاشتیم: «ارائه محصولاتی که شایسته زیبایی و سلامت پوست شما باشد».
          امروز، پس از ۱۴ سال تجربه و افتخار همراهی با شما، گالری سرمه تنها یک
          فروشگاه لوازم آرایشی و بهداشتی نیست، بلکه به یک مرجع تخصصی و قابل
          اعتماد برای عاشقان زیبایی تبدیل شده است.
        </p>
        <p class="text-muted text-sm md:text-base leading-8">
          ما در سرمه آنلاین باور داریم که پوست شما، ارزشمندترین لباس شماست. به
          همین دلیل، در تمام این سال‌ها با وسواس و دقتی بی‌نظیر، مجموعه‌ای از
          بهترین و معتبرترین برندهای ایران و جهان را گرد هم آورده‌ایم تا
          تجربه‌ای متفاوت از مراقبت و زیبایی را برایتان رقم بزنیم.
        </p>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
          <div
            class="bg-purple-200/70 backdrop-blur-md p-4 rounded-2xl text-center flex flex-col items-center justify-center shadow-xs"
          >
            <span class="text-2xl lg:text-3xl font-bold text-purple-900 mb-2"
              >۱۴+</span
            >
            <span class="text-muted text-sm font-medium">سابقه و اعتبار</span>
          </div>
          <div
            class="bg-purple-200/70 backdrop-blur-md p-4 rounded-2xl text-center flex flex-col items-center justify-center shadow-xs"
          >
            <span class="text-2xl lg:text-3xl font-bold text-purple-900 mb-2"
              >۱۰۰+</span
            >
            <span class="text-muted text-sm font-medium">برند معتبر جهانی</span>
          </div>
          <div
            class="bg-purple-200/70 backdrop-blur-md p-4 rounded-2xl text-center flex flex-col items-center justify-center shadow-xs"
          >
            <span class="text-2xl lg:text-3xl font-bold text-purple-900 mb-2"
              >٪۱۰۰</span
            >
            <span class="text-muted text-sm font-medium">تضمین اصالت کالا</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  imageSrc: { type: String, required: true },
  alt: { type: String, required: true },
  fallbackSrc: { type: String, default: "/images/contact/Group.svg" },
});
</script>
