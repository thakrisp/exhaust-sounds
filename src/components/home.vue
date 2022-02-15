<template>
  <!-- page container -->
  <div class="flex lg:m-6">
    <SideBar v-show="false" />
    <!-- Main container w-5/6-->
    <div class="rounded min-h-full px-4 space-y-2 w-full">
      <trackContainerVue
        v-for="i in MongoData"
        :key="i._id"
        :wave-data="i"
      />
      <div
        v-if="!MongoData"
      >
        <div 
          class="rounded flex h-screen px-4 space-y-2 w-full items-center justify-center text-5xl text-red-400"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-12 w-12"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Something seems to have gone wrong 😞
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import trackContainerVue from "./trackContainer.vue";
import SideBar from "./sideBar.vue";

export default {
  name: "HomePage",
  components: {
    trackContainerVue,
    SideBar,
  },
  props: {},
  data() {
    return {
      MongoData: null,
      options: {},
    };
  },
  async created() {
    try {
      const response = await axios.get("/api/posts");
      this.MongoData = response.data
    } catch (err) {
      this.error = err.message;
    }},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
