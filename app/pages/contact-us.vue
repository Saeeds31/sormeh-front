<!-- app/pages/contact-us.vue -->
<template>
  <main class="pb-20 flex flex-col container mx-auto !space-y-10">
    <!-- مسیر راهنما (Breadcrumb) -->
    <SharedBreadCrumb
      class="mb-2"
      :items="[
        { label: 'صفحه اصلی', href: '/' },
        { label: 'تماس با ما', href: '/contact-us' },
      ]"
    />

    <!-- ۱. فرم تماس و بنر اصلی در بالای صفحه -->
    <ContactFormSection :model="form" :loading="loading" @submit="submitForm" />

    <!-- ۲. کارت‌های راه‌های ارتباطی -->
    <ContactChannels class="mt-6" :contact-info="contactInfo" />

    <!-- ۳. بخش سوالات متداول -->
    <ContactFaqSection class="mt-6" />
  </main>
</template>

<script setup>
import { reactive, ref, computed } from "vue";

const config = useRuntimeConfig();
const apiBase = (config.public.apiBase || config.public.baseURL || "").replace(
  /\/$/,
  "",
);

const defaultContactInfo = {
  address: "گلستان، گرگان، نبش گلشهر ۲، فروشگاه لوازم آرایشی و بهداشتی",
  mobile: "۰۹۱۱-۷۳۵-۱۵۴۴",
  phone: "۰۱۷۳-۲۵۲-۵۰۳۱",
  whatsappId: "@sormeh.cosmetic_",
  whatsappUrl: "https://wa.me/989117351544",
  baleId: "@sormeh.cosmetic_",
  baleUrl: "https://ble.ir/",
  instagram: "https://instagram.com/sormeh.cosmetic",
  instagramId: "@sormeh.cosmetic_",
  supportHours: "۱۰:۰۰ صبح الی ۲۱:۰۰",
};

const { data } = await useAsyncData("contact-page", async () => {
  // در صورت داشتن اندپوینت مجزا برای تنظیمات تماس، اینجا فراخوانی می‌شود
  return null;
});

const contactInfo = computed(
  () => data.value?.contactInfo ?? defaultContactInfo,
);

const form = reactive({
  name: "",
  lastName: "",
  phone: "",
  email: "",
  message: "",
});

const loading = ref(false);

const toEnglishDigits = (value) => {
  if (!value) return "";
  const persianNums = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  const arabicNums = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
  return value
    .toString()
    .split("")
    .map((char) => {
      const pIdx = persianNums.indexOf(char);
      if (pIdx > -1) return pIdx.toString();
      const aIdx = arabicNums.indexOf(char);
      if (aIdx > -1) return aIdx.toString();
      return char;
    })
    .join("");
};

const resetForm = () => {
  form.name = "";
  form.lastName = "";
  form.phone = "";
  form.email = "";
  form.message = "";
};

const submitForm = async () => {
  // ترکیب نام و نام خانوادگی برای فیلد full_name در بک‌اند
  const firstName = form.name.trim();
  const lastName = (form.lastName || "").trim();
  const fullName = lastName ? `${firstName} ${lastName}` : firstName;
  const message = form.message.trim();
  const normalizedPhone = toEnglishDigits(form.phone).replace(/\D/g, "");

  if (!firstName) {
    alert("لطفاً نام خود را وارد کنید.");
    return;
  }

  if (normalizedPhone.length !== 11 || !normalizedPhone.startsWith("09")) {
    alert("شماره موبایل باید معتبر و دارای ۱۱ رقم باشد (مثلاً ۰۹۱۲۳۴۵۶۷۸۹).");
    return;
  }

  if (!message) {
    alert("متن پیام نمی‌تواند خالی باشد.");
    return;
  }

  loading.value = true;

  try {
    const fd = new FormData();
    fd.append("full_name", fullName);
    fd.append("subject", "پیام از فرم تماس وب‌سایت");
    fd.append("mobile", normalizedPhone);
    fd.append("email", form.email ? form.email.trim() : "");
    fd.append("body", message);

    await $fetch("/front/contact", {
      baseURL: apiBase,
      method: "POST",
      body: fd,
      headers: {
        Accept: "application/json",
      },
    });

    alert("پیام شما با موفقیت ثبت شد. به‌زودی با شما تماس خواهیم گرفت.");
    resetForm();
  } catch (error) {
    console.error(error);
    const status = error?.response?.status;
    const apiErrors = error?.response?._data;

    if (status === 422 && apiErrors?.errors) {
      const messages = Object.values(apiErrors.errors).flat().join("\n");
      alert(messages || apiErrors.message || "اعتبارسنجی با خطا مواجه شد.");
    } else {
      alert(
        apiErrors?.message ||
          "ارسال پیام با خطا مواجه شد. لطفاً دوباره تلاش کنید.",
      );
    }
  } finally {
    loading.value = false;
  }
};
</script>
