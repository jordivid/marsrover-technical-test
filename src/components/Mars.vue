<template>
  <div>
    <h1 class="text-center">MARS</h1>

    <div class="container-fluid d-flex flex-column align-items-center">
      <div class="row" v-for="(tileRow, index) of tileRows" :key="index">
        <div
          :class="tile"
          v-for="(tile, indx) of tileRow"
          :key="indx + 1000"
        ></div>
      </div>
    </div>

    <div class="d-flex justify-content-center">
      <button class="btn btn-primary mt-4 mb-3" @click="goHome">
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
      commandIndex: 0,
      commandProcess: null,
      rover: null,
      grid: null,
      squares: [],
      tileRows: [],
    };
  },

  methods: {
    goHome() {
      this.$emit("switchScreen", "Home");
    },

    processCommands() {
      let roverInsideGrid = true;

      if (this.commands[this.commandIndex] === "A") {
        if (this.grid.isPositionInside(this.rover.xPos, this.rover.yPos)) {
          this.squares[this.rover.xPos][this.rover.yPos] = "tile";
        }
      }

      this.rover.processCommand(this.commands[this.commandIndex]);
      roverInsideGrid = this.grid.isInside(this.rover);
      if (roverInsideGrid) {
        switch (this.rover.orientation) {
          case "N":
            this.squares[this.rover.xPos][this.rover.yPos] = "tile north";
            break;
          case "E":
            this.squares[this.rover.xPos][this.rover.yPos] = "tile east";
            break;
          case "S":
            this.squares[this.rover.xPos][this.rover.yPos] = "tile south";
            break;
          case "W":
            this.squares[this.rover.xPos][this.rover.yPos] = "tile west";
            break;
        }
      }

      /* 
      As a js starts with element 0 and ends with element n, but the test requires
      row n at the top and row 0 at the bottom, the array needs to be inverted in order
      for Vue to render it properly. 
      */
      this.tileRows = this.squares.slice();
      this.tileRows = this.tileRows.reverse();

      if (this.commandIndex === this.commands.length - 1) {
        clearInterval(this.commandProcess);
      } else {
        this.commandIndex++;
      }
    },
  },

  emits: ["switchScreen"],

  created() {
    /*
      During the creation of the component rover and grid objects are also created.
      An array is setup to determine how the tiles that will be drawn onscreen.
    */
    const params = JSON.parse(
      sessionStorage.getItem("JVC-provatecnica-params")
    );

    this.grid = new Grid(params.gridHeight, params.gridWidth);
    this.rover = new Rover(params.xPos, params.yPos, params.orientation);
    this.commands = Array.from(params.commands);
    this.commandIndex = 0;

    for (let x = 0; x < params.gridHeight; x++) {
      let fila = [];
      for (let y = 0; y < params.gridWidth; y++) {
        if (x === params.xPos && y === params.yPos) {
          switch (params.orientation) {
            case "N":
              fila.push("tile north");
              break;
            case "E":
              fila.push("tile east");
              break;
            case "S":
              fila.push("tile south");
              break;
            case "W":
              fila.push("tile west");
              break;
          }
        } else {
          fila.push("tile");
        }
      }
      this.squares.push(fila);
    }

    /* 
      As a js starts with element 0 and ends with element n, but the test requires
      row n at the top and row 0 at the bottom, the array needs to be inverted in order
      for Vue to render it properly. 
    */
    this.tileRows = this.squares.slice();
    this.tileRows = this.tileRows.reverse();
  },

  mounted() {
    this.commandProcess = setInterval(this.processCommands, 2000);
  },
};
</script>

<style scoped>
.bordered {
  box-sizing: border-box;
  border: 1px solid black;
}

.tile {
  box-sizing: border-box;
  width: 20px;
  height: 20px;
  background-color: rgb(185, 80, 80);
  border: 1px solid black;
}

.north,
.east,
.south,
.west {
  background-repeat: no-repeat;
  background-attachment: none;
  background-position: center;
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
