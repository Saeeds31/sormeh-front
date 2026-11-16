// app/plugins/imageUtils.js
// export default defineNuxtPlugin((nuxtApp) => {
//   const baseURL = "https://api.sormeh-online.com/storage_public/";
//   const getImageUrl = (path) => {
//     if (!path) return "";

//     if (
//       typeof path === "string" &&
//       (path.startsWith("http://") || path.startsWith("https://"))
//     ) {
//       return path;
//     }

//     const cleanPath = path.startsWith("/") ? path.slice(1) : path;
//     return `${baseURL}${cleanPath}`;
//   };

//   return {
//     provide: {
//       getImageUrl,
//     },
//   };
// });

// app/plugins/imageUtils.js
export default defineNuxtPlugin(() => {
  const baseURL = "https://api.sormeh-online.com/storage_public/";

  const getImageUrl = (path) => {
    if (!path) return "";

    // اگر احیاناً آبجکت ارسال شده باشد (مثلاً عکس ریسپانس مدیا لایبرری)
    if (typeof path === "object" && path !== null) {
      path = path.url || path.path || "";
    }

    if (typeof path !== "string" || !path.trim()) return "";

    // اگر آدرس از قبل کامل بود
    if (path.startsWith("http://") || path.startsWith("https://")) {
      return path;
    }

    // حذف اسلش اول
    let cleanPath = path.startsWith("/") ? path.slice(1) : path;

    // اگر در مسیر 'storage/' آمده، آن را با 'storage_public/' هماهنگ کن
    if (cleanPath.startsWith("storage/")) {
      cleanPath = cleanPath.replace(/^storage\//, "");
    }

    return `${baseURL}${cleanPath}`;
  };

  return {
    provide: {
      getImageUrl,
    },
  };
});
