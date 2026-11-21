<template>
  <div class="p-3 mt-6 rounded-inner border shadow-sm">
    <form @submit.prevent="submitComment" class="space-y-4">
      <div class="w-full flex flex-col md:flex-row gap-3 justify-between">
        <div class="w-full md:w-[50%]">
          <div class="flex gap-2 justify-start items-end md:justify-start">
            به این محصول امتیاز دهید :
            <button
              v-for="star in 5"
              :key="star"
              type="button"
              @click="formData.rating = star"
              class="transition-transform hover:scale-110"
            >
              <svg
                class="w-8 h-8 transition-colors"
                :class="
                  star <= formData.rating ? 'text-yellow-400' : 'text-gray-300'
                "
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  class="fill-current"
                  d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div>
        <label
          for="comment"
          class="block text-sm font-medium text-gray-700 mb-2"
        >
          متن دیدگاه :
        </label>
        <textarea
          v-model="formData.text"
          id="comment"
          rows="5"
          placeholder="نظر خود را در مورد محصول بنویسید..."
          required
          class="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm resize-y focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
      </div>
      <!-- بخش آپلود تصاویر (مطابق تصویر ارسالی) -->
      <div>
        <span class="block text-sm font-medium text-gray-700 mb-1 text-right">
          تصاویر:
        </span>

        <p class="text-xs text-gray-400 mb-3 text-right">
          یک یا چند تصویر انتخاب کنید
        </p>

        <div class="flex flex-wrap items-center gap-3">
          <!-- پیش‌نمایش تصاویر انتخاب‌شده -->
          <div
            v-for="(preview, index) in imagePreviews"
            :key="preview"
            class="relative w-20 h-20 rounded-xl border border-gray-200 overflow-hidden group"
          >
            <img
              :src="preview"
              alt="پیش‌نمایش تصویر"
              class="w-full h-full object-cover"
            />

            <button
              type="button"
              @click="removeImage(index)"
              class="absolute inset-0 bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              title="حذف تصویر"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <!-- دکمه انتخاب یک یا چند تصویر -->
          <label
            class="w-20 h-20 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 hover:border-[#4B3073] hover:text-[#4B3073] cursor-pointer transition-colors bg-gray-50"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 4v16m8-8H4"
              />
            </svg>

            <input
              ref="fileInput"
              type="file"
              accept="image/*"
              multiple
              class="hidden"
              @change="handleFileChange"
            />
          </label>
        </div>
      </div>

      <div class="flex flex-col sm:flex-row gap-3 pt-2">
        <button
          type="submit"
          :disabled="!isFormValid || loading"
          class="btn disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ثبت نظر
        </button>

        <button
          type="button"
          @click="resetForm"
          class="px-6 py-2.5 bg-accent text-sm font-medium rounded-inner transition-colors"
        >
          پاک کردن
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useAuth } from "~/composables/useAuth";
import { toast } from "vue3-toastify";
import { useApi } from "@/composables/api/useApi";
const route = useRoute();
const { loginModal } = useAuth();

const { postProductComment, getProductUploadStatus, postProductPhoto } =
  useApi();

const emit = defineEmits(["submit"]);

const formData = ref({
  name: "",
  rating: 0,
  text: "",
});
const selectedFiles = ref([]);
const imagePreviews = ref([]);
const fileInput = ref(null);
let loading = ref(false);
const isFormValid = computed(() => {
  return formData.value.rating > 0 && formData.value.text.trim();
});

const checkCanUpload = async () => {
  try {
    const res = await getProductUploadStatus(route.params.id);
    return res;
  } catch (error) {
    console.error("Error checking upload status:", error);
    return null;
  }
};

const handleFileChange = async (event) => {
  const files = Array.from(event.target.files || []);

  if (!files.length) return;

  const invalidFile = files.find((file) => file.size > 2 * 1024 * 1024);

  if (invalidFile) {
    toast.error("حجم هر تصویر نباید بیشتر از ۲ مگابایت باشد.");

    if (fileInput.value) {
      fileInput.value.value = "";
    }

    return;
  }

  const status = await checkCanUpload();

  if (status && status.can_upload === false) {
    toast.info(
      status.message || "امکان ارسال تصویر برای این محصول وجود ندارد.",
    );

    if (fileInput.value) {
      fileInput.value.value = "";
    }

    return;
  }

  imagePreviews.value.forEach((preview) => {
    URL.revokeObjectURL(preview);
  });

  selectedFiles.value = files;
  imagePreviews.value = files.map((file) => URL.createObjectURL(file));
};

const removeImage = (index = null) => {
  if (index !== null) {
    const preview = imagePreviews.value[index];

    if (preview) {
      URL.revokeObjectURL(preview);
    }

    selectedFiles.value.splice(index, 1);
    imagePreviews.value.splice(index, 1);

    if (fileInput.value) {
      fileInput.value.value = "";
    }

    return;
  }

  imagePreviews.value.forEach((preview) => {
    URL.revokeObjectURL(preview);
  });

  selectedFiles.value = [];
  imagePreviews.value = [];

  if (fileInput.value) {
    fileInput.value.value = "";
  }
};

const submitComment = async () => {
  const token = localStorage.getItem("auth-token");

  if (!token) {
    toast.warning("لطفا ابتدا وارد حساب کاربری خود شوید", {
      autoClose: 3000,
    });
    localStorage.setItem("lastPage", route.fullPath);

    setTimeout(() => {
      loginModal.value = true;
    }, 1000);
    return;
  }

  if (isFormValid.value) {
    loading.value = true;

    try {
      const fd = new FormData();
      fd.append("rating", formData.value.rating);
      fd.append("content", formData.value.text);
      fd.append("parent_id", "");
      await postProductComment(route.params.id, fd);

      if (selectedFiles.value.length > 0) {
        const photoData = new FormData();
        console.log(selectedFiles.value);

        selectedFiles.value.forEach((file, index) => {
          // بک‌اند شما صراحتاً images.0 را درخواست کرده است
          photoData.append(`images[${index}]`, file);
        });

        photoData.append("caption", "");

        await postProductPhoto(route.params.id, photoData);
      }

      toast.success("کامنت شما با موفقیت ثبت شد", {
        autoClose: 3000,
      });
      emit("submit");
      resetForm();
    } catch (error) {
      console.error("Error submitting comment or photo:", error);
      toast.error(error.response?.data?.message || "خطا در ثبت درخواست");
    } finally {
      loading.value = false;
    }
  }
};

const resetForm = () => {
  formData.value = {
    name: "",
    rating: 0,
    text: "",
  };
  removeImage();
};
</script>
