<template>
  <!-- Side bar container -->
  <div class="w-1/6 rounded-lg h-full p-4 border ">
    <SearchBar />
    <div class="block">
      <span class="text-gray-700">Exhaust status</span>
      <div class="mt-2">
        <div>
          <label class="inline-flex items-center">
            <input
              type="checkbox"
              class="form-checkbox"
              checked
            >
            <span class="ml-2">Stock</span>
          </label>
        </div>
        <div>
          <label class="inline-flex items-center">
            <input
              type="checkbox"
              class="form-checkbox"
              checked
            >
            <span class="ml-2">Modified</span>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchBar from "./searchBar.vue";

export default {
  components: {
    SearchBar,
  },
};
</script>

<style></style>
