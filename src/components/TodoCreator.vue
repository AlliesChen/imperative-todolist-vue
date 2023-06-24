<template>
  <tw-article>
    <template #header>
      <div class="flex flex-col gap-2">
        <h4 class="text-left">Create a new card:</h4>
        <task-status ref="selectRef" @update="updateStatus" />
      </div>
    </template>
    <template #main>
      <form ref="formRef" @submit.prevent="setArticles">
        <tw-input name="title" label="Title" />
        <tw-input name="content" type="textarea" label="Description" />
      </form>
    </template>
    <template #footer>
      <div class="w-full flex gap-2 justify-center">
        <tw-button class="px-2 py-1" @click="resetTodo" context="warning">
          <div class="flex items-center">
            <x-mark-icon class="w-5 h-5" />
            <span class="text-base">clear</span>
          </div>
        </tw-button>
        <tw-button class="px-2 py-1" @click="addTodo">
          <div class="flex items-center">
            <plus-icon class="w-5 h-5" />
            <span class="text-base">add</span>
          </div>
        </tw-button>
      </div>
    </template>
  </tw-article>
</template>

<script setup lang="ts">
import type { Article, Todo, Status } from "../types/Articles.type";

import { ref } from "vue";
import { nanoid } from "nanoid";

import TwInput from "../components/TwInput.vue";
import TwButton from "../components/TwButton.vue";
import TwArticle from "../components/TwArticle.vue";
import PlusIcon from "../assets/icons/PlusIcon.vue";
import XMarkIcon from "../assets/icons/XMarkIcon.vue";
import TwSelector from "../components/TwSelector.vue";
import TaskStatus from "../components/TaskStatus.vue";

const emits = defineEmits<{
  (e: "submit", value: Article): void;
}>();
const formRef = ref<HTMLFormElement>();
const selectRef = ref<typeof TwSelector>();
const selectedValue = ref();

function updateStatus(status: Status) {
  selectedValue.value = status;
}

function resetTodo() {
  formRef.value?.reset();
  selectRef.value?.selectRef.resetSelect();
}

function addTodo() {
  formRef.value?.requestSubmit();
}

function setArticles(e: Event) {
  const formData = new FormData(e.target as HTMLFormElement);
  const todo = Object.fromEntries(formData) as unknown as Todo;
  console.log(todo);
  const article: Article = {
    id: nanoid(),
    mode: "VIEW",
    header: selectedValue.value,
    main: { ...todo },
    footer: new Date().toUTCString(),
  };
  emits("submit", article);
  resetTodo();
}
</script>

<style scoped></style>
