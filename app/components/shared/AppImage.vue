<!-- app/components/shared/AppImage.vue -->
<template>
  <img
    :src="displaySrc"
    :alt="alt"
    :width="width"
    :height="height"
    :loading="loading"
    :decoding="decoding"
    :class="imgClass"
    @error="handleError"
    @load="onImageLoaded"
  />
</template>

<script>
import { ref, computed, watch, onMounted, onBeforeUnmount } from "vue";

export default {
  props: {
    src: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      default: "",
    },
    width: {
      type: [String, Number],
    },
    height: {
      type: [String, Number],
    },
    loading: {
      type: String,
      default: "lazy", // 'lazy' | 'eager'
    },
    decoding: {
      type: String,
      default: "async", // 'async' | 'auto' | 'sync'
    },
    imgClass: {
      type: String,
      default: "",
    },
    quality: {
      type: Number,
      default: 0.85, // کیفیت فشرده‌سازی WebP بین 0.1 تا 1.0
    },
  },
  emits: ["converted", "error", "load"],
  setup(props, { emit }) {
    // کش سراسری درون حافظه برای تصاویر تبدیل‌شده
    const webpCache = new Map();

    const currentSrc = ref(props.src);
    let generatedBlobUrl = null;

    // تشخیص فرمت SVG یا دیتای SVG
    const isSvg = computed(() => {
      if (!props.src) return false;
      return (
        props.src.toLowerCase().includes(".svg") ||
        props.src.startsWith("data:image/svg+xml")
      );
    });

    // سورس نهایی که در تگ img رندر می‌شود
    const displaySrc = computed(() => {
      if (isSvg.value) return props.src;
      return currentSrc.value;
    });

    // آزادسازی حافظه Blob ساخته‌شده قبلی
    const releaseBlobUrl = () => {
      if (generatedBlobUrl) {
        URL.revokeObjectURL(generatedBlobUrl);
        generatedBlobUrl = null;
      }
    };

    /**
     * تبدیل تصویر به WebP سمت کلاینت با استفاده از HTML5 Canvas
     */
    const processWebPConversion = async (imageUrl) => {
      // اگر در محیط سرور (SSR) هستیم یا عکس SVG است، تبدیل انجام نشود
      // `import.meta.server` در Nuxt 3 برای تشخیص SSR است. اگر Nuxt 2 باشد، نیاز به روش دیگری است.
      // فرض بر این است که در Nuxt 3 کار می‌کنیم.
      if (typeof window === "undefined" || !imageUrl || isSvg.value) {
        currentSrc.value = imageUrl;
        return;
      }

      // اگر قبلاً در کش موجود بود، از رم بخواند
      if (webpCache.has(imageUrl)) {
        currentSrc.value = webpCache.get(imageUrl);
        return;
      }

      // اگر خود عکس از قبل WebP بود نیازی به تبدیل مجدد نیست
      if (
        imageUrl.toLowerCase().endsWith(".webp") ||
        imageUrl.startsWith("data:image/webp")
      ) {
        currentSrc.value = imageUrl;
        return;
      }

      try {
        const img = new Image();
        img.crossOrigin = "anonymous"; // جلوگیری از Tainted Canvas در تصاویر ریموت

        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.naturalWidth;
          canvas.height = img.naturalHeight;

          const ctx = canvas.getContext("2d");
          if (!ctx) {
            currentSrc.value = imageUrl;
            return;
          }

          ctx.drawImage(img, 0, 0);

          // تبدیل خروجی Canvas به Blob با فرمت WebP
          canvas.toBlob(
            (blob) => {
              if (blob) {
                releaseBlobUrl();
                const blobUrl = URL.createObjectURL(blob);
                generatedBlobUrl = blobUrl;
                webpCache.set(imageUrl, blobUrl);
                currentSrc.value = blobUrl;
                emit("converted", blobUrl);
              } else {
                // در صورت پشتیبانی نکردن یا عدم خروجی، همان سورس اصلی بماند
                currentSrc.value = imageUrl;
              }
            },
            "image/webp",
            props.quality,
          );
        };

        img.onerror = () => {
          // اگر خطای لود یا CORS رخ داد، تصویر اصلی بدون کرش لود شود
          currentSrc.value = imageUrl;
        };

        img.src = imageUrl;
      } catch {
        currentSrc.value = imageUrl;
      }
    };

    const handleError = (event) => {
      emit("error", event);
    };

    const onImageLoaded = (event) => {
      emit("load", event);
    };

    // تغییر سورس هنگام بروزرسانی props.src
    watch(
      () => props.src,
      (newSrc) => {
        processWebPConversion(newSrc);
      },
    );

    onMounted(() => {
      processWebPConversion(props.src);
    });

    onBeforeUnmount(() => {
      releaseBlobUrl();
    });

    return {
      displaySrc,
      handleError,
      onImageLoaded,
    };
  },
};
</script>
