<template>
  <div class="container mt-3">
    <h1 class="text-center">TEST PARAMS</h1>
    <div class="d-flex flex-column">
      <h2 class="text-center">Grid size</h2>
      <div class="d-flex justify-content-center">
        <div class="form-group param">
          <label for="gridHeight">Height</label>
          <input
            id="gridHeight"
            type="number"
            min="2"
            step="1"
            class="form-control"
            v-model.number="gridHeight"
          />
        </div>
        <div class="form-group param">
          <label for="gridWidth">Width</label>
          <input
            id="gridWidth"
            type="number"
            min="2"
            step="1"
            class="form-control"
            autofocus
            v-model.number="gridWidth"
          />
        </div>
      </div>
      <div class="text-center invalid-feedback d-block" v-if="errorDim !== ''">
        {{ errorDim }}
      </div>
    </div>
    <div class="d-flex flex-column mt-3">
      <h2 class="text-center">Starting position</h2>
      <div class="d-flex justify-content-center">
        <div class="form-group param">
          <label for="xPos">X coord</label>
          <input
            id="xPos"
            type="number"
            min="1"
            step="1"
            class="form-control"
            v-model.number="xPos"
          />
        </div>
        <div class="form-group param">
          <label for="yPos">Y coord</label>
          <input
            id="yPos"
            type="number"
            min="1"
            step="1"
            class="form-control"
            v-model.number="yPos"
          />
        </div>
        <div class="form-group">
          <label for="orientation">Orientation</label>
          <select
            name="orientation"
            id="orientation"
            class="form-control"
            v-model="orientation"
          >
            <option value="N">North</option>
            <option value="E">East</option>
            <option value="S">South</option>
            <option value="W">West</option>
          </select>
        </div>
      </div>
      <div class="text-center invalid-feedback d-block" v-if="errorX">
        Initial X must be between 0 and (height - 1)
      </div>
      <div class="text-center invalid-feedback d-block" v-if="errorY">
        Initial Y must be between 0 and (width - 1)
      </div>
    </div>
    <div class="d-flex flex-column mt-3">
      <h2 class="text-center">Commands</h2>
      <input id="commands" v-model="commands" disabled />
      <div class="text-center invalid-feedback d-block" v-if="errorCommands">
        You must enter at least 1 command
      </div>
      <div class="d-flex justify-content-around flex-wrap mt-3">
        <button class="btn btn-secondary mt-1" @click="addCommand('L')">
          Turn left
        </button>
        <button class="btn btn-secondary mt-1" @click="addCommand('A')">
          Advance
        </button>
        <button class="btn btn-secondary mt-1" @click="addCommand('R')">
          Turn right
        </button>
        <button class="btn btn-secondary mt-1" @click="deleteCommands">
          Delete all
        </button>
        <button class="btn btn-secondary mt-1" @click="deleteLastCommand">
          Delete last
        </button>
      </div>
    </div>
    <div class="d-flex justify-content-center">
      <button class="btn btn-primary mt-4 mb-3" @click="runTest">
        Run test
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",

  data() {
    return {
      gridHeight: 2,
      gridWidth: 2,
      xPos: 0,
      yPos: 0,
      orientation: "N",
      commands: "",
      errorDim: "",
      errorX: false,
      errorY: false,
      errorCommands: false,
    };
  },

  methods: {
    runTest() {
      /*
       Checks validity of params, if valid runs test.
       - Grid is a minimum dimension of 2X2 tiles and a maximum depending on navigator's window dimensions
       - Initial position must be inside the grid
       - There must be at least one command
      */
      let maxWidth = Math.floor(window.innerWidth / 28);
      let maxHeight = Math.floor(window.innerHeight / 28) - 2;
      let params = {};
      this.errorDim = "";
      this.errorX = false;
      this.errorY = false;
      this.errorCommands = false;

      if (this.commands.length === 0) {
        this.errorCommands = true;
      }
      if (!(this.gridHeight > 1 && this.gridWidth > 1)) {
        this.errorDim = "Minimum grid dimensions are 2X2";
        return;
      } else if (this.gridWidth > maxWidth || this.gridHeight > maxHeight) {
        this.errorDim = `Max grid dimensions are ${maxHeight}X${maxWidth}`;
        return;
      }
      if (this.xPos < 0 || this.xPos >= this.gridHeight) {
        this.errorX = true;
      }
      if (this.yPos < 0 || this.yPos >= this.gridWidth) {
        this.errorY = true;
      }

      if (this.errorX || this.errorY || this.errorCommands) {
        return;
      }

      params.gridHeight = this.gridHeight;
      params.gridWidth = this.gridWidth;
      params.xPos = this.xPos;
      params.yPos = this.yPos;
      params.orientation = this.orientation;
      params.commands = this.commands;
      sessionStorage.setItem("JVC-provatecnica-params", JSON.stringify(params));

      this.$emit("switchScreen", "Mars");
    },

    addCommand(command) {
      this.commands += command;
    },

    deleteCommands() {
      this.commands = "";
    },

    deleteLastCommand() {
      if (this.commands.length > 0) {
        this.commands = this.commands.substring(0, this.commands.length - 1);
      }
    },
  },

  emits: ["switchScreen"],
};
</script>

<style scoped>
.param {
  width: 100px;
  margin-right: 20px;
}
</style>
