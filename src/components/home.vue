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
  mounted() {},
  async created() {
    try {
      this.MongoData = await this.getList();
    } catch (err) {
      this.error = err.message;
    }
  },
  methods: {
    getList() {
      return new Promise((resolve, reject) => {
        axios
          .get("http://localhost:5000/api/posts")
          .then((res) => resolve(res.data))
          .catch(() => {
            reject;
          });
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
