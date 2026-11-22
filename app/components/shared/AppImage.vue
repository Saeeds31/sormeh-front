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
    @load="handleLoad"
  />
</template>

<script>
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";

/**
 * کش مشترک بین تمام نمونه‌های SharedAppImage
 *
 * نکته:
 * Blob URLها تا زمان بسته‌شدن صفحه نگه داشته می‌شوند تا اگر یک تصویر
 * در چند بخش پروژه استفاده شد، دوباره تبدیل نشود.
 */
const webpCache = new Map();

/**
 * جلوگیری از تبدیل هم‌زمان چندباره یک تصویر
 */
const pendingConversions = new Map();

/**
 * تشخیص SVG
 */
const isSvgSource = (source) => {
  if (!source || typeof source !== "string") return false;

  const normalizedSource = source.toLowerCase().split("?")[0].split("#")[0];

  return (
    normalizedSource.endsWith(".svg") ||
    source.toLowerCase().startsWith("data:image/svg+xml")
  );
};

/**
 * تشخیص WebP
 */
const isWebpSource = (source) => {
  if (!source || typeof source !== "string") return false;

  const normalizedSource = source.toLowerCase().split("?")[0].split("#")[0];

  return (
    normalizedSource.endsWith(".webp") ||
    source.toLowerCase().startsWith("data:image/webp")
  );
};

/**
 * GIF را به WebP تبدیل نمی‌کنیم؛
 * چون تبدیل آن به Canvas فقط اولین فریم را نگه می‌دارد.
 */
const isGifSource = (source) => {
  if (!source || typeof source !== "string") return false;

  const normalizedSource = source.toLowerCase().split("?")[0].split("#")[0];

  return (
    normalizedSource.endsWith(".gif") ||
    source.toLowerCase().startsWith("data:image/gif")
  );
};

/**
 * کلید یکتا برای کش
 */
const getCacheKey = (source, quality) => {
  return `${source}::quality:${quality}`;
};

/**
 * بررسی پشتیبانی مرورگر از WebP
 */
const supportsWebP = () => {
  if (typeof document === "undefined") return false;

  try {
    const canvas = document.createElement("canvas");

    return canvas.toDataURL("image/webp").indexOf("data:image/webp") === 0;
  } catch {
    return false;
  }
};

/**
 * تبدیل تصویر به WebP
 *
 * در صورت شکست، همان سورس اصلی برگردانده می‌شود.
 */
const convertToWebP = (source, quality) => {
  if (
    typeof window === "undefined" ||
    !source ||
    isSvgSource(source) ||
    isWebpSource(source) ||
    isGifSource(source) ||
    !supportsWebP()
  ) {
    return Promise.resolve({
      src: source,
      converted: false,
      cacheKey: null,
    });
  }

  const cacheKey = getCacheKey(source, quality);

  /**
   * اگر قبلاً تبدیل شده، از کش استفاده می‌کنیم
   */
  if (webpCache.has(cacheKey)) {
    return Promise.resolve({
      src: webpCache.get(cacheKey),
      converted: true,
      cacheKey,
    });
  }

  /**
   * اگر همین تصویر هم‌زمان در حال تبدیل است،
   * همان Promise را به نمونه‌های دیگر می‌دهیم.
   */
  if (pendingConversions.has(cacheKey)) {
    return pendingConversions.get(cacheKey);
  }

  const conversionPromise = new Promise((resolve) => {
    const image = new Image();

    /**
     * برای تصاویر ریموت لازم است.
     * اگر سرور CORS را اجازه ندهد، در onerror سورس اصلی استفاده می‌شود.
     */
    image.crossOrigin = "anonymous";
    image.decoding = "async";

    let settled = false;

    const resolveOnce = (result) => {
      if (settled) return;

      settled = true;
      pendingConversions.delete(cacheKey);
      resolve(result);
    };

    /**
     * جلوگیری از معطل‌ماندن دائمی در صورت مشکل شبکه
     */
    const timeoutId = window.setTimeout(() => {
      resolveOnce({
        src: source,
        converted: false,
        cacheKey: null,
      });
    }, 15000);

    image.onload = () => {
      try {
        if (!image.naturalWidth || !image.naturalHeight) {
          window.clearTimeout(timeoutId);

          resolveOnce({
            src: source,
            converted: false,
            cacheKey: null,
          });

          return;
        }

        const canvas = document.createElement("canvas");
        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;

        const context = canvas.getContext("2d");

        if (!context) {
          window.clearTimeout(timeoutId);

          resolveOnce({
            src: source,
            converted: false,
            cacheKey: null,
          });

          return;
        }

        context.drawImage(image, 0, 0);

        canvas.toBlob(
          (blob) => {
            window.clearTimeout(timeoutId);

            if (!blob) {
              resolveOnce({
                src: source,
                converted: false,
                cacheKey: null,
              });

              return;
            }

            const blobUrl = URL.createObjectURL(blob);

            /**
             * فقط تبدیل موفق در کش ذخیره می‌شود.
             */
            webpCache.set(cacheKey, blobUrl);

            resolveOnce({
              src: blobUrl,
              converted: true,
              cacheKey,
            });
          },
          "image/webp",
          quality,
        );
      } catch {
        window.clearTimeout(timeoutId);

        resolveOnce({
          src: source,
          converted: false,
          cacheKey: null,
        });
      }
    };

    image.onerror = () => {
      window.clearTimeout(timeoutId);

      /**
       * خطای CORS یا خطای دانلود نباید باعث خراب‌شدن تصویر شود.
       */
      resolveOnce({
        src: source,
        converted: false,
        cacheKey: null,
      });
    };

    image.src = source;
  });

  pendingConversions.set(cacheKey, conversionPromise);

  return conversionPromise;
};

export default {
  name: "SharedAppImage",

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
      default: undefined,
    },

    height: {
      type: [String, Number],
      default: undefined,
    },

    loading: {
      type: String,
      default: "lazy",
      validator: (value) => ["lazy", "eager"].includes(value),
    },

    decoding: {
      type: String,
      default: "async",
      validator: (value) => ["async", "auto", "sync"].includes(value),
    },

    imgClass: {
      type: String,
      default: "",
    },

    quality: {
      type: Number,
      default: 0.85,
      validator: (value) => value >= 0.1 && value <= 1,
    },
  },

  emits: ["converted", "error", "load"],

  setup(props, { emit }) {
    /**
     * در SSR همان سورس اصلی رندر می‌شود.
     * بعد از mount در مرورگر، در صورت امکان به WebP تبدیل خواهد شد.
     */
    const currentSrc = ref(props.src);

    const requestId = ref(0);

    /**
     * سورس نهایی تصویر
     */
    const displaySrc = computed(() => {
      return currentSrc.value || props.src;
    });

    const processImage = async (source) => {
      const currentRequestId = ++requestId.value;

      /**
       * تا زمان پایان تبدیل، تصویر اصلی نمایش داده می‌شود.
       * این باعث می‌شود تصویر در حالت عادی ناپدید نشود.
       */
      currentSrc.value = source;

      if (!source) return;

      const result = await convertToWebP(source, props.quality);

      /**
       * اگر در زمان تبدیل، src تغییر کرده باشد،
       * نتیجه قبلی نباید روی تصویر جدید اعمال شود.
       */
      if (currentRequestId !== requestId.value) {
        return;
      }

      currentSrc.value = result.src;

      if (result.converted) {
        emit("converted", result.src);
      }
    };

    const handleError = (event) => {
      emit("error", event);
    };

    const handleLoad = (event) => {
      emit("load", event);
    };

    watch(
      () => props.src,
      (newSource) => {
        processImage(newSource);
      },
    );

    onMounted(() => {
      processImage(props.src);
    });

    onBeforeUnmount(() => {
      /**
       * فقط درخواست فعلی این نمونه را بی‌اعتبار می‌کنیم.
       *
       * Blob URL را اینجا revoke نمی‌کنیم، چون ممکن است همین URL
       * در یک کامپوننت دیگر از کش در حال استفاده باشد.
       */
      requestId.value++;
    });

    return {
      displaySrc,
      handleError,
      handleLoad,
    };
  },
};
</script>
