<template>
  <button :type="props.type"
    class="inline-block rounded text-xs font-medium uppercase leading-normal text-white transition duration-150 ease-in-out focus:outline-none focus:ring-0"
    :class="[{ 'rounded-full': props.roundedFull }, styleContext]">
    <slot>button</slot>
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { cond, eq, constant, stubTrue } from "lodash/fp";

export interface Props {
  type?: "button" | "submit" | "reset";
  roundedFull?: boolean;
  context?: "success" | "danger" | "warning" | "info";
}
const props = withDefaults(defineProps<Props>(), {
  type: "button",
  roundedFull: false,
  context: undefined,
});

const styleMatcher = cond<Props['context'], string>([
  [
    eq("success"),
    constant(
      "bg-success shadow-[0_4px_9px_-4px_#14a44d] hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] active:bg-success-700 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)]"
    ),
  ],
  [
    eq("danger"),
    constant(
      "bg-danger shadow-[0_4px_9px_-4px_#dc4c64] hover:bg-danger-600 hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:bg-danger-600 focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] active:bg-danger-700 active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)]"
    ),
  ],
  [
    eq("warning"),
    constant(
      "bg-warning shadow-[0_4px_9px_-4px_#e4a11b] hover:bg-warning-600 hover:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] focus:bg-warning-600 focus:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)] active:bg-warning-700 active:shadow-[0_8px_9px_-4px_rgba(228,161,27,0.3),0_4px_18px_0_rgba(228,161,27,0.2)]"
    ),
  ],
  [
    eq("info"),
    constant(
      "bg-info shadow-[0_4px_9px_-4px_#54b4d3] hover:bg-info-600 hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:bg-info-600 focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] active:bg-info-700 active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)]"
    ),
  ],
  [
    stubTrue,
    constant(
      "bg-primary shadow-[0_4px_9px_-4px_#3b71ca] hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
    ),
  ],
]);
const styleContext = computed(() => styleMatcher(props.context));
</script>

<style scoped></style>
