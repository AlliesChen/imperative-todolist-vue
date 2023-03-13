<template>
  <div class="min-h-screen px-2 py-4 bg-neutral-800 dark:bg-neutral-900">
    <div class="max-w-[1024px] mx-auto">
      <section class="flex flex-col items-center gap-2">
        <h1 class="text-primary text-4xl">Todo List</h1>
        <todo-creator class="w-72" @submit="addArticle" />
      </section>
      <section
        class="mt-4 grid grid-cols-1 justify-items-center sm:grid-cols-2 lg:grid-cols-3"
        v-if="articles.length > 0"
      >
        <basic-article
          v-for="article in articles"
          class="w-72"
          :key="article.id"
          :todoNo="article.id"
          :header="article.header"
          :main="article.main"
          :footer="article.footer"
        />
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import TodoCreator from "./components/TodoCreator.vue";
import BasicArticle from "./components/BasicArticle.vue";

import type { Article } from "./types/articles";

const articles = ref<Array<Article>>([]);

onMounted(() => {
  const importTE = async () => {
    await import("tw-elements");
  };
  importTE();
});

function addArticle(article: Article) {
  articles.value.push(article);
}
</script>
