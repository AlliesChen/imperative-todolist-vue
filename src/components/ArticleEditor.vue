<template>
  <tw-article v-if="props.mode === 'EDIT'">
    <template #header>
      <label class="flex justify-center items-center gap-1">
        <span class="text-sm dark:text-white">Status:</span>
        <select class="rounded text-black" @change="updateStatus">
          <option v-for="option in useTodoStatusOptions()" :key="option.id">{{ option.value }}</option>
        </select>
      </label>
    </template>

    <template #main>
      <form ref="formRef" class="flex flex-col items-center gap-1" @submit.prevent="confirmEditing">
        <label class="flex flex-col items-start">
          <span class="text-xs dark:text-white">Title</span>
          <input class="px-1 rounded" :value="props.main.title" />
        </label>
        <label class="flex flex-col items-start">
          <span class="text-xs dark:text-white">Content</span>
          <input class="px-1 rounded" type="textarea" :value="props.main.content" />
        </label>
      </form>
    </template>

    <template #footer>
      <div class="w-full flex gap-2 justify-center">
        <tw-button class="px-2 py-1" @click="cancelEditing" context="warning">
          <span class="text-base">cancel</span>
        </tw-button>
        <tw-button class="px-2 py-1" @click="submitForm">
          <span class="text-base">update</span>
        </tw-button>
      </div>
    </template>
  </tw-article>
</template>

<script setup lang="ts">
import type { Article } from "../types/Articles.type";
import type { UpdateEvent as BasicUpdateEvent } from "./BasicArticle.vue";

import { ref } from "vue";
import TwArticle from "./TwArticle.vue";
import TwButton from "./TwButton.vue";
import { useTodoStatusOptions } from "@/hooks/todoStatusOptions";

export interface Props {
  todoNo: Article["id"];
  mode: Article["mode"];
  header: Article["header"];
  main: Article["main"];
  footer: Article["footer"];
}

export interface UpdateEvent {
  action: BasicUpdateEvent["action"] | "update" | "cancel";
  props: BasicUpdateEvent["props"];
}

const props = defineProps<Props>();
const emits = defineEmits<{
  (e: "update", value: UpdateEvent): void;
}>();
const formRef = ref<HTMLFormElement>();
const selectedValue = ref(props.header);

function updateStatus(event: Event) {
  const newStatus = (event.target as HTMLSelectElement).value;
  selectedValue.value = newStatus;
}
function cancelEditing() {
  emits("update", { action: "cancel", props: { ...props } });
}
function submitForm() {
  formRef.value?.requestSubmit();
}
function confirmEditing(e: Event) {
  const inputValues = (e.target as HTMLFormElement).querySelectorAll("input")
  const [titleNode, contentNode] = Array.from(inputValues);
  emits("update", {
    action: "update",
    props: {
      todoNo: props.todoNo,
      mode: "VIEW",
      header: selectedValue.value,
      main: {
        title: titleNode.value,
        content: contentNode.value
      },
      footer: new Date().toUTCString(),
    },
  });
}
</script>

<style></style>
