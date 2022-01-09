class Grid {
    /**
     * 
     * @param {Number} width number of cells in each row of the grid
     * @param {Number} height number of cells in each col of the grid 
     */
    constructor(width, height, randomInit = false, initDensity = 0){
        this.width = width;
        this.height = height;

        this.cells = new Array(this.width).fill(0).map(() => new Array(this.height).fill(0));
        if (randomInit){
            for (let i = 0; i < this.cells.length; i++){
                for (let j = 0; j < this.cells[i].length; j++){
                    if (random() < initDensity) 
                    this.cells[i][j] = new Cell(true);
                    else this.cells[i][j] = new Cell(false);
                }
            }
        } else {
            for (let i = 0; i < this.cells.length; i++){
                for (let j = 0; j < this.cells[i].length; j++){
                    this.cells[i][j] = new Cell(false);
                }
            }
        }

        this.gridSizeWarned = false;
         
    }

    draw(gridSize, topLeftX, topLeftY){
        strokeWeight(5/gridSize); 
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
                if (this.cells[i][j].isActive){
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
        strokeWeight(2 * (5/gridSize));
        noFill();
        rect(topLeftX, topLeftY, topLeftX + (gridSize * this.width), topLeftY + (gridSize * this.height));
    }

    getCellAt(x, y){
        if (x < 0) x += this.width;
        if (y < 0) y += this.height;
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

    updateGrid(rule){
        for (let i = 0; i < this.width; i++){
            for (let j = 0; j < this.height; j++){
                if (rule(this.getSurroundings(i, j)) == 1) this.cells[i][j].isActive = true;
                else this.cells[i][j].isActive = false;
            }
        }
    }
}