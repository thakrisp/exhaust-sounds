<template>
  <div class="h-14 p-4 self-center rounded space-x-1">
    <span class="font-semibold text-gray-500 text-opacity-70 pr-2">Tags:</span>
    <span
      v-for="tag in tags"
      :key="tag"
      class="text-xs px-3 font-medium bg-red-500 text-white rounded-full py-1.5 hover:bg-red-600"
    >
      {{ tag }}
    </span>
  </div>
</template>

<script>
export default {
  props: {
    tags: Array,
  },
};
</script>

<style></style>
