<template>
  <tw-article>
    <template #header>
      <h4 class="absolute">
        {{ props.header }}
      </h4>
      <div class="w-full flex justify-between">
        <div>
          <tw-button
            class="p-1"
            rounded-full
            context="danger"
            @click="updateTodo"
          >
            <TrashIcon class="w-4 h-4 pointer-events-none" />
          </tw-button>
        </div>
        <div class="flex gap-2">
          <tw-button
            v-show="props.header !== 'COMPLETE'"
            class="p-1"
            rounded-full
            context="success"
            @click="updateTodo"
          >
            <ChceckIcon class="w-4 h-4 pointer-events-none" />
          </tw-button>
          <tw-button
            class="p-1"
            rounded-full
            context="warning"
            @click="updateTodo"
          >
            <PencilIcon class="w-4 h-4 pointer-events-none" />
          </tw-button>
        </div>
      </div>
    </template>
    <template #main>
      <h5
        class="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50"
      >
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
import type { Article } from "@/types/Articles.type";
import type { ClickEventType } from "./TwButton.vue";

import { cond, constant, eq, flow, get, stubTrue, tap } from "lodash/fp";
// component
import TwArticle from "./TwArticle.vue";
import TwButton from "./TwButton.vue";
import TrashIcon from "../assets/icons/TrashIcon.vue";
import ChceckIcon from "../assets/icons/CheckIcon.vue";
import PencilIcon from "../assets/icons/PencilIcon.vue";

export interface Props {
  todoNo: Article["id"];
  mode: Article["mode"];
  header: Article["header"];
  main: Article["main"];
  footer: Article["footer"];
}
export interface UpdateEvent {
  action: "check" | "edit" | "remove";
  props: Props;
}

const props = defineProps<Props>();

const emits = defineEmits<{
  (e: "update", value: UpdateEvent): void;
}>();

const updateTodo = flow(
  get("context"),
  tap((value) => console.log(value)),
  cond<ClickEventType["context"], UpdateEvent["action"]>([
    [eq("success"), constant("check")],
    [eq("warning"), constant("edit")],
    [eq("danger"), constant("remove")],
    [
      stubTrue,
      () => {
        throw Error("Unexpected click event type context");
      },
    ],
  ]),
  (action) => emits("update", { action, props: { ...props } })
);
</script>

<style scoped></style>
