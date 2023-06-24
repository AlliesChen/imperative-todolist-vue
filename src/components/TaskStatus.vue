<template>
  <tw-selector ref="selectRef" :options="todoStatusOptions" :default="props.default" label="Status"
    @value-change="updateStatus" />
</template>

<script setup lang="ts">
import type { Status } from "../types/Articles.type";

import { ref } from "vue";
import { useTodoStatusOptions, type TodoStatusOption } from "@/hooks/todoStatusOptions";
// component
import TwSelector from "../components/TwSelector.vue";

const props = defineProps<{
  default?: unknown;
}>();

const emits = defineEmits<{
  (e: "update", value: Status): void;
}>();

const selectRef = ref<typeof TwSelector>();
const todoStatusOptions: Array<TodoStatusOption> = useTodoStatusOptions();

defineExpose({
  selectRef,
});

function updateStatus(status: Status) {
  emits("update", status);
}
</script>

<style scoped></style>
