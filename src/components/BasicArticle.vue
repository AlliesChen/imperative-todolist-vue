<template>
  <tw-article>
    <template #header>
      <h4>{{ props.header }}</h4>
      <div class="absolute -translate-y-1 right-2 flex justify-center gap-2">
        <tw-button class="p-1" rounded-full context="danger" @click="removeTodo">
          <TrashIcon class="w-4 h-4" />
        </tw-button>
        <tw-button class="p-1" rounded-full context="success" @click="checkTodo">
          <ChceckIcon class="w-4 h-4" />
        </tw-button>
      </div>
    </template>
    <template #main>
      <h5 class="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
        {{ props.main?.title }}
      </h5>
      <p class="mb-4 text-base text-neutral-600 dark:text-neutral-200">
        {{ props.main?.content }}
      </p>
    </template>
    <template #footer>
      {{ props.footer }}
    </template>
  </tw-article>
</template>

<script setup lang="ts">
import TwArticle from "./TwArticle.vue";
import TwButton from "./TwButton.vue";
import TrashIcon from "../assets/icons/TrashIcon.vue";
import ChceckIcon from "../assets/icons/CheckIcon.vue";

export interface Props {
  todoNo: string | number;
  header: string;
  main: {
    title: string;
    content: string;
  };
  footer: string;
}

const props = defineProps<Props>();

const emits = defineEmits<{
  (e: "check", value: Props): void;
  (e: "remove", value: Props): void;
}>();

function checkTodo() {
  emits("check", props);
}

function removeTodo() {
  emits("remove", props);
}
</script>

<style scoped></style>
