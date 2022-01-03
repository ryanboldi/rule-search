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
}