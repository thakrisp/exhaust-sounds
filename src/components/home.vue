<template>
  <!-- page container -->
  <div class="flex space-x-4 m-6">
    <!-- Side bar container -->
    <div class="bg-red-200 w-1/6 rounded min-h-screen p-4">Side search bar</div>
    <!-- Main container -->
    <div
      class="w-5/6 rounded min-h-full p-4  space-y-2"
    >
      <track-container-vue v-for="n in 3" :key="n" :waveId="n" />
    </div>
  </div>
</template>

<script>
import trackContainerVue from './trackContainer.vue';

export default {
  name: 'home-Page',
  components: {
    trackContainerVue,
  },
  data() {
    return {
      options: {},
      //file: 'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3',
    };
  },
  props: {},
  mounted() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
