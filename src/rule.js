function conwayRules(input){
    if (input.length != 9){
        console.log("Conway rules requires 9 inputs")
        return -1;
    } else {
        let neighbors = 0;
        for (let i = 0; i < 9; i++){
            if (i !== 4){
                if (input[i].isActive == true){
                    neighbors += 1;
                }
            } 
        }

        //if cell is alive
        if (input[4].isActive == true){
            if (neighbors < 2) return 0;
            else if (neighbors > 3) return 0;
            else return 1;
        } else {
            // if cell is dead
            if (neighbors == 3) return 1;
        }
        return 0;
    }
}