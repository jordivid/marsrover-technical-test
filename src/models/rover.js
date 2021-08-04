export class Rover {
  constructor(xPos, yPos, orientation) {
    this._xPos = xPos;                  // Current x coord
    this._yPos = yPos;                  // Current y coord
    this._orientation = orientation;    // Current orientation
  }

  get xPos() {
    return this._xPos;
  }

  get yPos() {
    return this._yPos;
  }

  get orientation() {
    return this._orientation;
  }

  set orientation(side) {
    // Changes rovers orientation
    switch (side) {
      case "L":
        switch (this._orientation) {
          case "N":
            this._orientation = "W";
            break;
          case "E":
            this._orientation = "N";
            break;
          case "S":
            this._orientation = "E";
            break;
          case "W":
            this._orientation = "S";
            break;
        }
        break;
      case "R":
        switch (this._orientation) {
          case "N":
            this._orientation = "E";
            break;
          case "E":
            this._orientation = "S";
            break;
          case "S":
            this._orientation = "W";
            break;
          case "W":
            this._orientation = "N";
            break;
        }
        break;
    }
  }

  move() {
    // Moves the rover
    switch (this._orientation) {
      case "N":
        this._xPos += 1;
        break;
      case "E":
        this._yPos += 1;
        break;
      case "S":
        this._xPos -= 1;
        break;
      case "W":
        this._yPos -= 1;
        break;
    }
  }

  processCommand(command) {
    // Process any valid command

    // Orientation change
    if (command === "L" || command === "R") {
      this.orientation = command;
      return;
    }

    // Movement
    if (command === "A") {
        this.move();
    }
  }
}
