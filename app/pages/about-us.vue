<!-- app/pages/about-us.vue -->
<template>
  <main class="pb-20 flex flex-col container space-y-10">
    <!-- مسیر راهنما (Breadcrumb) -->
    <SharedBreadCrumb :items="[{ label: 'درباره ما', href: '/about-us' }]" />

    <!-- بخش اول: هیرو و معرفی کلی با کامپوننت‌های اختصاصی -->
    <AboutHeroCollage
      :image-src="aboutData.hero.imageSrc"
      :alt="aboutData.hero.alt"
      :fallback-src="aboutData.hero.fallbackSrc"
    />

    <!-- بخش دوم: داستان برند و گرید نقل‌قول/تصاویر -->
    <AboutStorySection
      :title="aboutData.story.title"
      :paragraphs="aboutData.story.paragraphs"
      :highlight="aboutData.story.highlight"
      :image-src="aboutData.story.imageSrc"
      :image-alt="aboutData.story.imageAlt"
      :fallback-src="aboutData.story.fallbackSrc"
    />

    <!-- بخش سوم: اعضای تیم سرمه -->
    <!-- <section class="my-8 space-y-8">
      <SharedSectionSliderHeader
        class="mb-6 md:mb-8"
        :show-arrows="false"
        :title-parts="[
          { text: 'اعضای تیم', class: 'text-gray-900 font-bold' },
          { text: 'سرمه آنلاین', class: 'font-normal text-[#3F2356]' },
        ]"
        title-class="text-base md:text-2xl font-bold"
        title-border-class="border-r-2 border-[#3F2356] pr-2.5"
        divider-visible-class="hidden md:block"
        divider-class="bg-gray-200"
      />

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
        <div
          v-for="member in teamMembers"
          :key="member.id"
          class="group relative"
        >
          <div
            class="relative rounded-3xl bg-[#3B1E63] shadow-md transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl pb-2"
          >
            <div
              class="relative aspect-square w-full overflow-hidden rounded-3xl"
            >
              <SharedAppImage
                :src="member.image"
                :alt="member.name"
                format="webp"
                class="w-full h-full object-cover object-top scale-105 transition-transform duration-500"
              />
            </div>
            <div
              class="absolute mx-auto -bottom-6 inset-x-4 z-10 bg-[#ECE6F6]/95 backdrop-blur-xs py-2.5 px-4 w-3/4 rounded-xl text-center shadow-md border border-white/60"
            >
              <h3
                class="font-bold text-sm md:text-base text-[#3B1E63] leading-tight"
              >
                {{ member.name }}
              </h3>
              <p class="text-xs text-gray-500 mt-1 font-medium">
                {{ member.role }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section> -->

    <section class="my-12 space-y-6">
      <SharedSectionSliderHeader
        class="mb-6 md:mb-8"
        :show-arrows="false"
        :title-parts="[
          { text: 'جدیدترین اخبار', class: 'text-gray-900 font-bold' },
          { text: 'سرمه', class: 'font-normal text-[#3F2356]' },
        ]"
        title-class="text-base md:text-2xl font-bold"
        title-border-class="border-r-2 border-[#3F2356] pr-2.5"
        divider-visible-class="hidden md:block"
        divider-class="bg-gray-200"
        view-all-link="/blogs"
        view-all-text="مشاهده همه مقالات"
      />
      <div
        v-if="pendingBlogs"
        class="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse"
      >
        <div v-for="n in 3" :key="n" class="h-80 bg-gray-200 rounded-2xl" />
      </div>

      <div
        v-else-if="latestBlogs && latestBlogs.length > 0"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <HomeArticlesBigCard
          v-for="blog in latestBlogs.slice(0, 3)"
          :key="blog.id"
          :card="blog"
        />
      </div>

      <div v-else class="text-center py-10 text-muted">
        مقاله‌ای برای نمایش یافت نشد.
      </div>
    </section>
  </main>
</template>

<script setup>
import { computed } from "vue";
import { useBlogStore } from "@/store/blog";
import { useApi } from "@/composables/api/useApi";

const blogStore = useBlogStore();
const { getBlogs } = useApi();

// داده‌های پیش‌فرض درباره ما
const defaultAbout = {
  hero: {
    imageSrc: "/images/about/Group.svg",
    alt: "گالری سرمه",
    fallbackSrc: "/images/contact/Group.svg",
  },
  story: {
    title: "تبدیل رویای زیبایی به واقعیتی درخشان",
    paragraphs: [
      "به دنیای زیبایی و سلامت گالری سرمه خوش آمدید. داستان ما از دو دهه پیش در شهر زیبای گرگان آغاز شد؛ زمانی که با یک هدف ساده اما بزرگ پا به این عرصه گذاشتیم: «ارائه محصولاتی که شایسته زیبایی و سلامت پوست شما باشد».",
      "امروز، پس از ۱۴ سال تجربه و افتخار همراهی با شما، گالری سرمه تنها یک فروشگاه لوازم آرایشی و بهداشتی نیست، بلکه به یک مرجع تخصصی و قابل اعتماد برای عاشقان زیبایی تبدیل شده است.",
      "ما در سرمه آنلاین باور داریم که پوست شما، ارزشمندترین لباس شماست. به همین دلیل، در تمام این سال‌ها با وسواس و دقتی بی‌نظیر، مجموعه‌ای از بهترین و معتبرترین برندهای ایران و جهان را گرد هم آورده‌ایم تا تجربه‌ای متفاوت از مراقبت و زیبایی را برایتان رقم بزنیم.",
    ],
    highlight:
      "ما به دنبال تعادل بین راحتی، اصالت و زیبایی بی‌همتا هستیم. محصولاتی با اصالت صددرصدی و تضمین‌شده برای کسانی که به سلامت و درخشش خود اهمیت می‌دهند.",
    imageSrc: "/images/about/sunscreens.svg",
    imageAlt: "گالری سرمه",
    fallbackSrc: "/images/about/Group.svg",
  },
};

// واکشی دیتای اختصاصی صفحه درباره ما در صورت وجود API
const { data } = await useAsyncData("about-page", async () => {
  return null;
});

const aboutData = computed(() => data.value ?? defaultAbout);

// واکشی آخرین مقالات برای بخش اخبار سرمه
const { pending: pendingBlogs } = await useAsyncData(
  "about-blogs",
  async () => {
    const response = await getBlogs({ page: 1 });
    const fetchedData = response?.data || response;
    blogStore.setBlogs(fetchedData);
    return fetchedData;
  },
);

const latestBlogs = computed(() => {
  const raw = blogStore.blogs;
  return Array.isArray(raw) ? raw : raw?.data || [];
});

// اعضای تیم
const teamMembers = [
  {
    id: 1,
    name: "ادریس سرشار",
    role: "مدیریت",
    image: "/images/about/team-member.png",
  },
  {
    id: 2,
    name: "ادریس سرشار",
    role: "مدیریت",
    image: "/images/about/team-member.png",
  },
  {
    id: 3,
    name: "ادریس سرشار",
    role: "مدیریت",
    image: "/images/about/team-member.png",
  },
  {
    id: 4,
    name: "ادریس سرشار",
    role: "مدیریت",
    image: "/images/about/team-member.png",
  },
];
</script>
