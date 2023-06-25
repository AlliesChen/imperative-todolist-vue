<template>
  <div class="relative mb-3" data-te-input-wrapper-init>
    <input
      v-if="props.type === 'text'"
      class="peer block min-h-[auto] w-full rounded border-0 bg-transparent py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
      :type="props.type"
      :id="props.id"
      :name="props.name"
      :placeholder="props.placeholder"
      :value="props.default"
    />
    <textarea
      v-else-if="props.type === 'textarea'"
      class="peer block min-h-[auto] w-full rounded border-0 bg-transparent py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
      rows="4"
      :id="props.id"
      :name="props.name"
      :placeholder="props.placeholder"
      :value="props.default"
    />
    <div v-else>Unsupported Type in {{ props }}</div>
    <label
      :for="props.id"
      class="pointer-events-none absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-neutral-200"
    >
      {{ props.label }}
    </label>
  </div>
</template>

<script setup lang="ts">
import { nanoid } from "nanoid";

interface Props {
  id?: string;
  label?: string;
  name?: string;
  type?: "text" | "email" | "password" | "number" | "tel" | "url" | "textarea";
  placeholder?: string;
  default?: string;
}
const props = withDefaults(defineProps<Props>(), {
  id: () => nanoid(),
  label: "Text input",
  name: undefined,
  type: "text",
  placeholder: "Example label",
  default: "",
});
</script>
