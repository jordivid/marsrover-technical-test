<template>
  <div>
    <h1 class="text-center">MARS</h1>

    <div class="container-fluid d-flex justify-content-center">
      <div class="tile"></div>
      <div class="tile north"></div>
      <div class="tile east"></div>
      <div class="tile south"></div>
      <div class="tile west"></div>
    </div>

    <div class="d-flex justify-content-center">
      <button class="btn btn-primary mt-4" @click="goHome">
        Stop test
      </button>
    </div>
  </div>
</template>

<script>
import { Rover } from "@/models/rover";
import { Grid } from "@/models/grid";

export default {
  name: "Mars",

  data() {
    return {
      commands: [],
      rover: null,
      grid: null,
      squares: [],
    };
  },

  methods: {
    goHome() {
      this.$emit("switchScreen", "Home");
    },
  },

  emits: ["switchScreen"],

  created() {
    const params = JSON.parse(
      sessionStorage.getItem("JVC-provatecnica-params")
    );

    this.grid = new Grid(params.gridHeight, params.gridWidth);
    this.rover = new Rover(params.xPos, params.yPos, params.orientation);
    this.commands = Array.from(params.commands);

    for(let i = 0; i < params.gridHeight; i++) {
      let fila = [];
      for(let j = 0; j < params.gridWidth; j++) {
        fila.push(0);
      }
      this.squares.push(fila);
    }
    

    
  },

  mounted() {
    for (let command of this.commands) {
      this.rover.processCommand(command);
      this.grid.isInside(this.rover);
    }
  },
};
</script>

<style scoped>

.bordered{
  box-sizing: border-box;
  border: 1px solid black;
}

.tile {
  box-sizing: border-box;
  width: 20px;
  height: 20px;
  background-color: lightgray;
}

.north,
.east,
.south,
.west {
  background-repeat: no-repeat;
  background-attachment: none;
  background-position: fixed;
  background-size: cover;
}

.north {
  background-image: url("./../assets/north.png");
}
.east {
  background-image: url("./../assets/east.png");
}
.south {
  background-image: url("./../assets/south.png");
}
.west {
  background-image: url("./../assets/west.png");
}
</style>
