class Grid {
    /**
     * 
     * @param {Number} width number of cells in each row of the grid
     * @param {Number} height number of cells in each col of the grid 
     */
    constructor(width, height){
        this.width = width;
        this.height = height;

        this.cells = new Array(this.width).fill(0).map(() => new Array(this.height).fill(0));
        this.cells[5][5] = 1;
        this.cells[4][5] = 1;

        this.gridSizeWarned = false;
    }

    draw(gridSize, topLeftX, topLeftY){
        //check if gridsize is mismatched, warn the user if so (but only once)
        if (!this.gridSizeWarned){
            if (gridSize * this.width != WIDTH || gridSize * this.height != HEIGHT){
                console.warn("gridsize mismatch with screen size");
                this.gridSizeWarned = true;
            }
        }

        //draw all of the boxes
        fill(1);
        for (let i = 0; i < this.width; i++){
            for (let j = 0; j < this.height; j++){
                if (this.cells[i][j] == 1){
                    rect(topLeftX + (i * gridSize), topLeftY + (j * gridSize), gridSize, gridSize); 
                }
            }
        }

        //draw the vertical lines
        for (let i = 0; i < this.width; i++){
            line(topLeftX + (i * gridSize), 0, topLeftX + (i * gridSize), (gridSize * this.height));
        }

        //draw the horizontal lines
        for (let i = 0; i < this.height; i++){
            line(0, topLeftY + (i * gridSize), (gridSize * this.width), topLeftY + (i * gridSize));
        }

        //draw double thickness rectangle around the grid
        strokeWeight(2);
        noFill();
        rect(topLeftX, topLeftY, topLeftX + (gridSize * this.width), topLeftY + (gridSize * this.height));
        strokeWeight(1);  
    }

    getCellAt(x, y){
        return (this.cells[x % this.width][y % this.height]);
    }

    /**
     * returns an array of the cells around (and including) a cell at (x, y)
     * @param {Number} x x-value of the center
     * @param {Number} y y-value of the center 
     */
    getSurroundings(x, y){
        let positionsX = [x - 1, x, x + 1];
        let positionsY = [y - 1, y, y + 1];
        let positions = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        let k = 0;
        //populate positions array
        positionsY.forEach((y) => {
            positionsX.forEach((x) => {
                positions[k++] = this.getCellAt(x, y)
            })
        });

        return positions;
    }
}