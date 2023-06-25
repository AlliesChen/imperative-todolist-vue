<template>
  <div class="min-h-screen px-2 py-4 bg-neutral-800 dark:bg-neutral-900">
    <div class="max-w-[1024px] mx-auto">
      <section class="flex flex-col items-center gap-2">
        <h1 class="text-primary text-4xl">Todo List</h1>
        <tw-switch
          class="text-neutral-900 dark:text-neutral-50"
          title="Show ALL tasks"
          @switch="onDisplaySettingChange"
        />
        <todo-creator class="w-72" @submit="addArticle" />
      </section>
      <section
        v-if="articles.length > 0"
        class="mt-4 grid grid-cols-1 justify-items-center sm:grid-cols-2 lg:grid-cols-3"
      >
        <template v-for="article in articleList" :key="article.id">
          <basic-article
            v-if="article.mode === 'VIEW'"
            :todoNo="article.id"
            :mode="article.mode"
            :header="article.header"
            :main="article.main"
            :footer="article.footer"
            @update="onUpdateArticle"
          />
          <article-editor
            v-else-if="article.mode === 'EDIT'"
            class="w-72"
            :todoNo="article.id"
            :mode="article.mode"
            :header="article.header"
            :main="article.main"
            :footer="article.footer"
            @update="onUpdateArticle"
          />
          <div v-else>Error: unsupported mode in {{ article }}</div>
        </template>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Article } from "./types/Articles.type";
import type { UpdateEvent } from "./components/ArticleEditor.vue";

import { onMounted, ref, computed } from "vue";
import { cond, lt, stubTrue, flow, findIndex, tap, merge } from "lodash/fp";

import TodoCreator from "./components/TodoCreator.vue";
import TwSwitch from "./components/TwSwitch.vue";
import ArticleEditor from "./components/ArticleEditor.vue";
import BasicArticle from "./components/BasicArticle.vue";

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
  [
    (item) => item.action === "cancel",
    (item) =>
      articles.value.splice(item.index, 1, {
        id: item.props.todoNo,
        mode: "VIEW",
        header: item.props.header,
        main: item.props.main,
        footer: item.props.footer,
      }),
  ],
  [
    (item) => item.action === "update",
    (item) =>
      articles.value.splice(item.index, 1, {
        id: item.props.todoNo,
        mode: item.props.mode,
        header: item.props.header,
        main: item.props.main,
        footer: item.props.footer,
      }),
  ],
]);
const onUpdateArticle = flow(
  tap((event: Article) =>
    console.log(`update article, event: ${JSON.stringify(event)}`)
  ),
  mergeFoundArticleId,
  updateArticle
);

const onDisplaySettingChange = (value: boolean) =>
  (hasCompletedTask.value = value);

function addArticle(article: Article) {
  articles.value.push(article);
}
</script>
