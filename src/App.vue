<template>
  <div class="min-h-screen px-2 py-4 bg-neutral-800 dark:bg-neutral-900">
    <div class="max-w-[1024px] mx-auto">
      <section class="flex flex-col items-center gap-2">
        <h1 class="text-primary text-4xl">Todo List</h1>
        <tw-switch
          class="text-neutral-900 dark:text-neutral-50"
          title="Show completed tasks"
          @switch="onDisplaySettingChange"
        />
        <todo-creator class="w-72" @submit="addArticle" />
      </section>
      <section
        class="mt-4 grid grid-cols-1 justify-items-center sm:grid-cols-2 lg:grid-cols-3"
        v-if="articles.length > 0"
      >
        <basic-article
          v-for="article in articleList"
          class="w-72"
          :key="article.id"
          :todoNo="article.id"
          :mode="article.mode"
          :header="article.header"
          :main="article.main"
          :footer="article.footer"
          @update="onRemoveArticle"
        />
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import TodoCreator from "./components/TodoCreator.vue";
import TwSwitch from "./components/TwSwitch.vue";
import BasicArticle from "./components/BasicArticle.vue";

import type { Article } from "./types/articles";
import type { UpdateEvent } from "./components/BasicArticle.vue";
import { cond, lt, stubTrue, flow, findIndex, tap, merge } from "lodash/fp";

const hasCompletedTask = ref(false);
const articles = ref<Array<Article>>([]);
const filterArticlesPredicator = cond([
  [() => hasCompletedTask.value, stubTrue],
  [stubTrue, (article: Article) => article.header === "TODO"],
]);
const articleList = computed(() =>
  articles.value.filter(filterArticlesPredicator)
);

onMounted(() => {
  const importTE = async () => {
    await import("tw-elements");
  };
  importTE();
});

function addArticle(article: Article) {
  articles.value.push(article);
}
const mergeFoundArticleId = (item: UpdateEvent) =>
  merge({
    index: findIndex(
      (article: Article) => article.id === item.props.todoNo,
      articles.value
    ),
  })(item);
const updateArticle = cond<UpdateEvent & { index: number }, void>([
  [
    (item) => lt(0)(item.index),
    (item) => {
      throw RangeError(`Article: ${JSON.stringify(item.props)} does not exist`);
    },
  ],
  [
    (item) => item.action === "check",
    (item) => (articles.value[item.index].header = "COMPLETE"),
  ],
  [
    (item) => item.action === "edit",
    (item) => (articles.value[item.index].mode = "EDIT"),
  ],
  [
    (item) => item.action === "remove",
    (item) => articles.value.splice(item.index, 1),
  ],
]);
const onRemoveArticle = flow(
  tap((event: Article) =>
    console.log(`update article, event: ${JSON.stringify(event)}`)
  ),
  mergeFoundArticleId,
  updateArticle
);

const onDisplaySettingChange = (value: boolean) =>
  (hasCompletedTask.value = value);
</script>
