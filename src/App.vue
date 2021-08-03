<template>
  <div id="app">
    <component :is="currentComponent" @switchScreen="changeScreen"></component>
  </div>
</template>

<script>
import Home from "./components/Home.vue";
import Mars from "./components/Mars.vue";

export default {
  name: "App",
  data() {
    return {
      currentComponent: "Home",
    };
  },

  methods: {
    changeScreen(screen) {
      this.currentComponent = screen;
    },
  },

  components: {
    Home,
    Mars,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
