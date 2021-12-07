<template>
  <!-- page container -->
  <div class="flex space-x-4 m-6">
    <SideBar v-show="false" />
    <!-- Main container w-5/6-->
    <div class="rounded min-h-full p-4 space-y-2">
      <!-- remove testData in production-->
      <track-container-vue v-for="i in testData" :key="i.id" :waveData="i" />
      <track-container-vue v-for="i in MongoData" :key="i._id" :waveData="i" />
    </div>
  </div>
</template>

<script>
import trackContainerVue from './trackContainer.vue';
import SideBar from './sideBar.vue';
import testData from '../assets/testData.json';

import axios from 'axios';
const url = 'http://localhost:5000/api/posts/';

export default {
  name: 'home-Page',
  components: {
    trackContainerVue,
    SideBar,
  },
  data() {
    return {
      testData: testData,
      MongoData: null,
      options: {},
    };
  },
  methods: {
    getList() {
      return new Promise((resolve, reject) => {
        axios
          .get(url)
          .then((res) => resolve((this.games = res.data)))
          .catch(() => {
            reject;
          });
      });
    },
    async addToList(value) {
      let stringValue = value.toString();
      await axios.post(url, { name: stringValue });
      this.getList();
    },
  },
  props: {},
  mounted() {},
  async created() {
    try {
      this.MongoData = await this.getList();
      console.log(this.MongoData);
    } catch (err) {
      this.error = err.message;
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
