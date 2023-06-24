<template>
  <div
    class="block rounded-lg bg-white text-center shadow-lg dark:bg-neutral-700"
  >
    <div
      class="relative h-content p-2 flex items-center justify-center border-b-2 border-neutral-100 dark:border-neutral-600 dark:text-neutral-50"
    >
      <slot name="header">Header</slot>
    </div>
    <div class="p-6">
      <slot name="main">Main</slot>
    </div>
    <div
      class="border-t-2 border-neutral-100 py-3 px-6 dark:border-neutral-600 dark:text-neutral-50"
    >
      <slot name="footer">Footer</slot>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
