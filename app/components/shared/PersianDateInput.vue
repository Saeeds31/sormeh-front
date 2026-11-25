<template>
  <date-picker
    v-model="date"
    type="date"
    format="YYYY-MM-DD"
    display-format="jYYYY/jMM/jDD"
    placeholder="انتخاب تاریخ تولد"
    :editable="false"
    :auto-submit="false"
    :clearable="true"
    input-class="border rounded-inner p-3 py-4 w-full outline-hidden"
  />
</template>

<script setup>
import { computed } from "vue";
import VuePersianDatetimePicker from "vue3-persian-datetime-picker";

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue"]);

const date = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value || ""),
});
</script>
