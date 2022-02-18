<template>
  <div class="py-2 flex flex-wrap space-x-2 ">
    <span class="font-semibold text-blue-500 text-opacity-70 pr-2 self-center">Tags:</span>
    <span
      v-for="tag in tags"
      :key="tag"
      class="px-2 py-1 rounded-full text-red-500 bg-red-200 font-semibold text-sm flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease"
    >
      {{ tag }}
    </span>
  </div>
</template>

<script>
export default {
  props: {
    tags: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style></style>
