<template>
  <div>
    <h1 class="text-center">MARS</h1>
    <div class="d-flex justify-content-center">
      <button class="btn btn-primary mt-4" @click="goHome">
        Stop test
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Mars",

  methods: {
    goHome() {
      this.$emit("switchScreen", "Home");
    }
  },

  emits: ["switchScreen"],
};
</script>
