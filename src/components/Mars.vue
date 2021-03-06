<template>
  <div class="mt-3">
    <h1 class="text-center">ROVER ON MARS</h1>
    <div v-if="!resultVisible">
      <div class="text-center" v-if="commandProcess != null">
        <span class="bold">Command list</span>:
        <span class="bg-info">{{ orders.substring(0, commandIndex) }}</span
        ><span>{{ orders.substring(commandIndex) }}</span>
      </div>
      <div class="text-center" v-else>
        <span class="bold">Command list:</span>
        <span class="bg-info">{{ orders }}</span>
      </div>
      <div class="text-center">
        <span class="bold">Orientation</span>: {{ rover.orientation }}<br>
        <span class="bold">Position</span>: {{ rover.xPos }},
        {{ rover.yPos }}
        <span
          class="bg-danger"
          v-if="grid.isPositionInside(rover.xPos, rover.yPos) === false"
          >Out of limits</span
        >
      </div>
    </div>
    <div class="text-center d-flex flex-column" v-else>
      <div><span class="bold">Execute commands</span>: {{ !grid.wentOut }}</div>
      <div>
        <span class="bold">Final orientation</span>: {{ rover.orientation }}<br>
        <span class="bold">Final position</span>: {{ rover.xPos }},
        {{ rover.yPos }}
      </div>
    </div>

    <div class="container-fluid d-flex flex-column align-items-center mt-2">
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
        {{ buttonText }}
      </button>
    </div>

    <div v-if="result !== ''">
      {{ result }}
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
      orders: "",
      commands: [],
      commandIndex: 0,
      commandProcess: null,
      rover: null,
      grid: null,
      squares: [],
      tileRows: [],
      resultVisible: false,
      buttonText: "Stop test"
    };
  },

  methods: {
    goHome() {
      this.$emit("switchScreen", "Home");
    },

    processCommands() {
      // Commands processing. The function is run asynchronously.
      let roverInsideGrid = true;

      // Update square onscreen
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
        // No more commands
        clearInterval(this.commandProcess);
        this.commandProcess = null;
        this.resultVisible = true;
        this.buttonText = "Back";
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
    this.orders = params.commands;
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

.bold {
  font-weight: bold;
}
</style>
