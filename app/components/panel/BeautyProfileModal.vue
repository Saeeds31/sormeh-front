<!-- app/components/panel/BeautyProfileModal.vue -->
<template>
  <div
    v-if="show"
    class="fixed inset-0 z-[100] overflow-hidden bg-slate-950/55 backdrop-blur-[2px] sm:overflow-y-auto sm:p-5"
    @click.self="closeModal"
  >
    <div
      class="flex h-full min-h-0 w-full items-center justify-center sm:min-h-full"
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="beauty-modal-title"
        dir="rtl"
        class="relative flex h-full min-h-0 w-full flex-col overflow-hidden bg-white shadow-2xl sm:my-auto sm:h-auto sm:max-h-[calc(100dvh-2.5rem)] sm:max-w-2xl sm:rounded-2xl sm:border sm:border-gray-100"
      >
        <div class="h-1.5 bg-[#533470]"></div>

        <header
          class="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-gray-100 bg-white px-4 py-4 sm:px-6 sm:py-5"
        >
          <div class="space-y-1">
            <h3
              id="beauty-modal-title"
              class="text-base font-extrabold text-gray-900 sm:text-lg"
            >
              پروفایل بیوتی
            </h3>
            <p class="text-xs leading-6 text-gray-500">
              گزینه‌های موردنظرتان را انتخاب کنید و تغییرات را ذخیره کنید.
            </p>
          </div>

          <button
            type="button"
            class="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#533470]/30"
            aria-label="بستن"
            :disabled="submitting"
            @click="closeModal"
          >
            <X class="h-5 w-5" />
          </button>
        </header>

        <div
          class="min-h-0 flex-1 overflow-y-auto overscroll-contain p-4 sm:p-6"
        >
          <div
            v-if="loading"
            class="flex min-h-48 flex-col items-center justify-center gap-3"
          >
            <SharedLoadingSpinner size="md" />
            <span class="text-sm text-gray-500">
              در حال دریافت گزینه‌ها...
            </span>
          </div>

          <div
            v-else-if="loadError"
            class="flex min-h-48 flex-col items-center justify-center gap-4 text-center"
          >
            <p class="text-sm font-medium leading-6 text-red-600">
              {{ loadError }}
            </p>

            <button
              type="button"
              class="min-h-11 rounded-xl border border-[#533470] px-5 text-sm font-bold text-[#533470] transition hover:bg-[#533470] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#533470]/30"
              @click="loadData"
            >
              تلاش مجدد
            </button>
          </div>

          <div v-else class="space-y-5">
            <div
              v-if="specifications.length === 0"
              class="rounded-xl border border-dashed border-gray-200 bg-gray-50 px-4 py-10 text-center text-sm text-gray-500"
            >
              هیچ گزینه‌ای برای نمایش یافت نشد.
            </div>

            <div v-else class="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div
                v-for="spec in specifications"
                :key="spec.id"
                class="flex flex-col gap-2"
              >
                <label
                  :for="`beauty-spec-${spec.id}`"
                  class="text-sm font-bold text-gray-700"
                >
                  {{ spec.title }}:
                </label>

                <select
                  :id="`beauty-spec-${spec.id}`"
                  v-model="selectedSelections[spec.id]"
                  class="min-h-12 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-base text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-[#533470] focus:ring-2 focus:ring-[#533470]/10"
                >
                  <option :value="undefined" disabled>انتخاب کنید</option>

                  <option
                    v-for="value in spec.values"
                    :key="value.id"
                    :value="Number(value.id)"
                  >
                    {{ value.value }}
                  </option>
                </select>
              </div>
            </div>

            <div
              v-if="submitError"
              class="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-center text-sm leading-6 text-red-600"
            >
              {{ submitError }}
            </div>
          </div>
        </div>
        <footer
          class="shrink-0 border-t border-gray-200 bg-white p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] sm:px-6 sm:py-4"
        >
          <button
            type="button"
            class="min-h-12 w-full rounded-xl btn px-4 text-sm font-bold text-white shadow-sm transition hover:bg-[#43275b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#533470]/30 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            :disabled="submitting || specifications.length === 0"
            @click="submit"
          >
            {{ submitting ? "در حال ذخیره..." : "ذخیره تغییرات" }}
          </button>
        </footer>
      </section>
    </div>
  </div>
</template>

<script setup>
import { onBeforeUnmount, ref, watch } from "vue";
import { X } from "lucide-vue-next";

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["close", "saved"]);

const { $api } = useNuxtApp();

const specifications = ref([]);
const selectedSelections = ref({});
const loading = ref(false);
const submitting = ref(false);
const loadError = ref("");
const submitError = ref("");

watch(
  () => props.show,
  (isVisible, wasVisible) => {
    if (import.meta.client) {
      document.body.style.overflow = isVisible ? "hidden" : "";
    }

    if (isVisible) {
      loadData();
    } else {
      submitError.value = "";
      loadError.value = "";
    }
  },
  { immediate: true },
);
onBeforeUnmount(() => {
  if (import.meta.client) {
    document.body.style.overflow = "";
  }
});

function closeModal() {
  if (submitting.value) return;
  emit("close");
}

async function loadData() {
  loading.value = true;
  loadError.value = "";
  submitError.value = "";

  try {
    const [specsResponse, selectionsResponse] = await Promise.all([
      $api.get("/specifications/system"),
      $api.get("/front/specifications/my-selections"),
    ]);

    const specsPayload = specsResponse.data || specsResponse;
    const selectionsPayload = selectionsResponse.data || selectionsResponse;

    if (specsPayload.success && Array.isArray(specsPayload.data)) {
      specifications.value = specsPayload.data;
    } else if (Array.isArray(specsPayload)) {
      specifications.value = specsPayload;
    } else {
      specifications.value = [];
    }

    const savedSelections = Array.isArray(selectionsPayload.data)
      ? selectionsPayload.data
      : [];

    const selectionMap = {};
    for (const item of savedSelections) {
      selectionMap[item.specification_id] = Number(item.specification_value_id);
    }

    selectedSelections.value = selectionMap;
  } catch (error) {
    console.error("Error loading beauty profile:", error);
    loadError.value = "دریافت اطلاعات با خطا مواجه شد. لطفاً دوباره تلاش کنید.";
  } finally {
    loading.value = false;
  }
}

async function submit() {
  submitError.value = "";

  const selections = Object.entries(selectedSelections.value)
    .filter(
      ([, valueId]) =>
        valueId !== undefined && valueId !== null && valueId !== "",
    )
    .map(([specificationId, valueId]) => ({
      specification_id: Number(specificationId),
      specification_value_id: Number(valueId),
    }));

  if (selections.length === 0) {
    submitError.value = "حداقل یک انتخاب الزامی است.";
    return;
  }

  submitting.value = true;

  try {
    const response = await $api.post("/front/specifications/user-selections", {
      selections,
    });
    const payload = response.data || response;

    if (!payload.success) {
      submitError.value =
        payload.message || "ذخیره اطلاعات انجام نشد؛ لطفاً دوباره تلاش کنید.";
      return;
    }

    emit("saved");
    emit("close");
  } catch (error) {
    console.error("Error saving beauty profile:", error);
    submitError.value =
      error.response?.data?.errors?.selections?.[0] ||
      error.response?.data?.message ||
      "خطا در ثبت اطلاعات، لطفاً مجدداً تلاش فرمایید.";
  } finally {
    submitting.value = false;
  }
}
</script>
