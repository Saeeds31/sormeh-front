<!-- app/pages/blogs.vue -->
<template>
  <main class="container space-y-10">
    <SharedBreadCrumb :items="[{ label: 'وبلاگ', href: '/blogs' }]" />

    <!-- Loading State -->
    <div
      v-if="pending"
      class="min-h-[60vh] flex flex-col items-center justify-center"
    >
      <div class="w-full max-w-7xl mx-auto space-y-8 animate-pulse">
        <div class="h-64 bg-gray-200 rounded-2xl" />
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="n in 6" :key="n" class="h-64 bg-gray-200 rounded-xl" />
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div
      v-else-if="error"
      class="min-h-[50vh] flex items-center justify-center text-center py-20"
    >
      <div class="space-y-4">
        <p class="text-red-500 text-lg font-medium">
          خطایی در بارگذاری مقالات رخ داد
        </p>
        <button @click="refresh" class="btn px-6 py-2.5">دوباره تلاش کن</button>
      </div>
    </div>

    <!-- Content State -->
    <div v-else-if="blogs && blogs.length > 0" class="space-y-10">
      <!-- Header Banner / Search Title Area -->
      <div
        class="bg-secondary/30 rounded-2xl flex flex-col md:flex-row items-start justify-between gap-6"
      >
        <div class="space-y-3 text-right">
          <h1 class="text-2xl lg:text-3xl font-bold">
            مطالب آموزشی <span class="font-extrabold text-strong">سرمه</span>
          </h1>
          <p class="text-muted text-sm lg:text-base max-w-2xl leading-8">
            به دنیای لوکس و بدون مرزِ زیبایی در سرمه آنلاین خوش آمدید؛ جایی که
            داستان اصالتِ برندهای معتبر جهانی از اینجا شروع می‌شود. با ما
            ترفندهای یک میکاپ حرفه‌ای و روتین‌های تخصصی پوست را یاد بگیرید و
            تفاوت استفاده از محصولات ۱۰۰٪ اورجینال را با تمام وجود لمس کنید. ما
            اینجا هستیم تا با مشاوره‌های کاربردی، آموزش‌های تخصصی و معرفی
            بهترین‌ها، الهام‌بخشِ استایل و زیبایی شما در هر سلیقه‌ای باشیم.
          </p>
        </div>

        <!-- Search Box inside Blog Header -->
        <div class="w-full md:w-80 relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="جستجوی مقاله..."
            class="w-full px-4 py-3 pl-11 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-800 transition-all shadow-sm"
          />
          <span class="absolute left-3.5 top-3.5 text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </span>
        </div>
      </div>

      <!-- مقالات فیلتر شده بر اساس سرچ یا لیست پیش‌فرض -->
      <div v-if="filteredBlogs.length > 0">
        <!-- Grid اصلی مقالات -->
        <div
          id="productList"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <HomeArticlesBigCard
            v-for="blog in filteredBlogs"
            :key="blog.id"
            :card="blog"
          />
        </div>

        <!-- Pagination -->
        <ProductsPagination
          v-if="pagination && !searchQuery"
          v-model="currentPage"
          :total-items="pagination.total"
          :items-per-page="pagination.per_page"
          class="mt-10 flex justify-center"
        />
      </div>

      <div
        v-else
        class="min-h-[30vh] flex items-center justify-center text-center text-muted text-base"
      >
        نتیجه‌ای برای جستجوی شما یافت نشد.
      </div>
    </div>

    <!-- Empty State -->
    <div
      v-else
      class="min-h-[50vh] flex items-center justify-center text-center text-muted text-lg"
    >
      مقاله‌ای یافت نشد.
    </div>
  </main>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useBlogStore } from "~/store/blog";
import { useApi } from "@/composables/api/useApi";

const blogStore = useBlogStore();
const { getBlogs } = useApi();

const currentPage = ref(1);
const searchQuery = ref("");

const fetchBlogs = async (page = 1) => {
  const response = await getBlogs({ page });
  const fetchedData = response?.data || response;
  blogStore.setBlogs(fetchedData);
  return fetchedData;
};

const { pending, error, refresh } = await useAsyncData("blogs", () =>
  fetchBlogs(currentPage.value),
);

const blogs = computed(() => {
  const raw = blogStore.blogs;
  if (!raw) return [];
  return Array.isArray(raw) ? raw : raw?.data || [];
});

const pagination = computed(() => blogStore.pagination);

// فیلتر زنده سمت کلاینت روی عنوان و توضیحات
const filteredBlogs = computed(() => {
  const query = searchQuery.value.trim().toLowerCase();
  if (!query) return blogs.value;

  return blogs.value.filter((blog) => {
    const title = (blog.title || "").toLowerCase();
    const summary = (
      blog.summary ||
      blog.short_description ||
      ""
    ).toLowerCase();
    return title.includes(query) || summary.includes(query);
  });
});

watch(currentPage, async (newPage) => {
  await fetchBlogs(newPage);
  document
    .getElementById("productList")
    ?.scrollIntoView({ behavior: "smooth" });
});
</script>

<style scoped>
.animate-pulse {
  animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
</style>
