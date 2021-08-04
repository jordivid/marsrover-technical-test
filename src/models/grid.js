export class Grid {
  constructor(height, width) {
    this._height = height; // Number of rows of the square
    this._width = width; // Number of columns of the square
    this._lastX = 0; // x of last valid coords
    this._lastY = 0; // y of last valid coords
    this._wentOut = false; // Did the rover go outside at any moment?
  }

  get height() {
    return this._height;
  }

  get width() {
    return this._width;
  }

  get wentOut() {
    return this._wentOut;
  }

  get lastX() {
    return this._lastX;
  }

  get lastY() {
    return this._lastY;
  }

  isInside(rover) {
    /*
     rover - object of type Rover
     It is validated if the rover is inside the square.
     If at any moment it is outside it will be recorded
     */
    const xCoord = rover.xPos;
    const yCoord = rover.yPos;
    let insideGrid = true;

    if (xCoord < 0 || xCoord > this._height - 1) {
      insideGrid = false;
      this._wentOut = true;
    }
    if (yCoord < 0 || yCoord > this._width - 1) {
      insideGrid = false;
      this._wentOut = true;
    }

    if (this._wentOut === false) {
      this._lastX = xCoord;
      this._lastY = yCoord;
    }

    return insideGrid;
  }

  isPositionInside(x, y) {
    // Checks if given coordinates are inside the square
    let insideGrid = true;

    if (x < 0 || x > this._height - 1) {
      insideGrid = false;
    }
    if (y < 0 || y > this._width - 1) {
      insideGrid = false;
    }

    return insideGrid;
  }
}
