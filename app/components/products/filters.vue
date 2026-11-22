<!-- <template>
  <div class="p-4 border rounded-lg">
    <div class="flex justify-between items-center mb-2">
      <h3 class="font-bold">دسته‌بندی</h3>
      <button @click="collapsed = !collapsed">
        <IconArrowTop v-if="collapsed" />
        <IconArrowBottom v-else />
      </button>
    </div>

    <div v-show="!collapsed" class="flex flex-col gap-2">
      <label
        v-for="item in categories"
        :key="item.id"
        class="flex justify-between items-center border-b last:border-b-0 pb-1"
      >
        <span>{{ item.title }}</span>
        <input
          type="checkbox"
          :value="item.id"
          v-model="localSelectedCategories"
          class="ml-2 accent-green-600"
        />
      </label>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  selectedCategories: {
    type: Array,
    default: () => []
  },
  categories: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['update:selectedCategories'])

const collapsed = ref(false)
const localSelectedCategories = ref([...props.selectedCategories])

watch(localSelectedCategories, (val) => {
  emit('update:selectedCategories', val)
})

watch(() => props.selectedCategories, (val) => {
  localSelectedCategories.value = [...val]
})
</script> -->

<!-- app/components/products/filters.vue -->
<template>
  <div class="p-4 rounded-inner lg:bg-[#F2EFF9]">
    <!-- عنوان فیلتر -->
    <div class="flex justify-between items-center mb-4">
      <h3 class="font-bold">دسته‌بندی</h3>

      <button
        type="button"
        class="p-1"
        :aria-expanded="!collapsed"
        aria-label="باز یا بسته کردن دسته‌بندی‌ها"
        @click="collapsed = !collapsed"
      >
        <!-- <IconArrowTop v-if="collapsed" />
        <IconArrowBottom v-else /> -->
      </button>
    </div>

    <div v-show="!collapsed" class="flex flex-col gap-3">
      <div
        v-for="cat in categories"
        :key="cat.id"
        class="flex flex-col gap-2 border-b last:border-b-0 pb-3"
      >
        <!-- دسته اصلی: اگر فرزند دارد فقط فلش و عنوان، اگر فرزند ندارد چک‌باکس -->
        <div class="flex justify-between items-center">
          <span class="font-bold text-sm text-gray-800">
            {{ cat.title }}
          </span>

          <!-- چک‌باکس فقط اگر فرزندی ندارد -->
          <input
            v-if="!hasChildren(cat)"
            type="checkbox"
            :value="cat.id"
            v-model="localSelectedCategories"
            class="ml-2 accent-green-600"
          />

          <!-- فلش باز و بسته کردن اگر فرزند دارد -->
          <button
            v-else
            type="button"
            class="p-1"
            :aria-expanded="isSubOpen(cat.id)"
            :aria-label="
              isSubOpen(cat.id)
                ? `بستن زیرمجموعه‌های ${cat.title}`
                : `باز کردن زیرمجموعه‌های ${cat.title}`
            "
            @click="toggleSub(cat.id)"
          >
            <IconArrowTop v-if="isSubOpen(cat.id)" />
            <IconArrowBottom v-else />
          </button>
        </div>

        <!-- زیرمجموعه‌های سطح اول -->
        <div
          v-if="hasChildren(cat) && isSubOpen(cat.id)"
          class="pr-3 flex flex-col gap-2 mt-1"
        >
          <div
            v-for="sub in getChildren(cat)"
            :key="sub.id"
            class="flex flex-col gap-2"
          >
            <!-- زیرمجموعه سطح اول: اگر فرزند دارد فقط فلش، اگر فرزند ندارد چک‌باکس -->
            <div class="flex justify-between items-center">
              <span class="text-sm font-medium text-gray-700">
                {{ sub.title }}
              </span>

              <input
                v-if="!hasChildren(sub)"
                type="checkbox"
                :value="sub.id"
                v-model="localSelectedCategories"
                class="ml-3 accent-green-600"
              />

              <button
                v-else
                type="button"
                class="p-3"
                :aria-expanded="isSubOpen(sub.id)"
                :aria-label="
                  isSubOpen(sub.id)
                    ? `بستن زیرمجموعه‌های ${sub.title}`
                    : `باز کردن زیرمجموعه‌های ${sub.title}`
                "
                @click="toggleSub(sub.id)"
              >
                <IconArrowTop v-if="isSubOpen(sub.id)" />
                <IconArrowBottom v-else />
              </button>
            </div>

            <!-- فرزندان سطح دوم (همیشه آخرین سطح / برگ هستند و چک‌باکس دارند) -->
            <div
              v-if="hasChildren(sub) && isSubOpen(sub.id)"
              class="pr-4 flex flex-col !gap-3"
            >
              <label
                v-for="child in getChildren(sub)"
                :key="child.id"
                class="flex justify-between items-center cursor-pointer text-sm text-muted hover:text-primary"
              >
                <span>{{ child.title }}</span>

                <input
                  type="checkbox"
                  :value="child.id"
                  v-model="localSelectedCategories"
                  class="ml-6 accent-green-600"
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  selectedCategories: {
    type: Array,
    default: () => [],
  },
  categories: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["update:selectedCategories"]);

const collapsed = ref(false);
const localSelectedCategories = ref([...props.selectedCategories]);
const openSubs = ref({});

const sameIds = (a, b) =>
  a.length === b.length &&
  a.every((id, index) => String(id) === String(b[index]));

const toggleSub = (id) => {
  openSubs.value[id] = !openSubs.value[id];
};

const isSubOpen = (id) => Boolean(openSubs.value[id]);

const getChildren = (item) => {
  return item?.children || item?.all_children || [];
};

const hasChildren = (item) => {
  const children = getChildren(item);
  return Array.isArray(children) && children.length > 0;
};

// تغییر ناشی از چک‌باکس را فقط در صورت تغییر واقعی به والد بفرست.
watch(
  localSelectedCategories,
  (value) => {
    if (!sameIds(value, props.selectedCategories)) {
      emit("update:selectedCategories", [...value]);
    }
  },
  { deep: true },
);

// تغییر ناشی از URL یا «حذف همه فیلترها» را فقط در صورت نیاز اعمال کن.
watch(
  () => props.selectedCategories,
  (value) => {
    const nextValue = value ?? [];

    if (!sameIds(localSelectedCategories.value, nextValue)) {
      localSelectedCategories.value = [...nextValue];
    }
  },
  { deep: true },
);
</script>
