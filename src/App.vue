<template>
  <div>
    <NavBar />
    <homePage />
  </div>
</template>

<script>
import homePage from "./components/home.vue";
import NavBar from "./components/navBar.vue";

export default {
  name: "App",
  components: {
    homePage,
    NavBar,
  },
  mounted:() => {
    //document.title = 'Car Exhaust Sounds'
  }
};
</script>

<style></style>
