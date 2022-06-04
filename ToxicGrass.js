class ToxicGrass extends LivingCreator {
    constructor(x, y) {
        super(x, y);
        this.multiply = 0;
    }

    mul() {
        this.multiply++;
        let emptyCells = this.chooseCell(0);
        let newCell = random(emptyCells);
        let emptyCells1 = this.chooseCell(1);
        let newCell1 = random(emptyCells1);

        if (newCell && this.multiply >= 8) {
            let newX = newCell[0];
            let newY = newCell[1];
            matrix[newY][newX] = 5;
            toxicGrassArr.push(new ToxicGrass(newX, newY));
            this.multiply = 0;
        } else if (newCell1 && this.multiply >= 8) {
            let newX = newCell1[0];
            let newY = newCell1[1];
            matrix[newY][newX] = 5;
            toxicGrassArr.push(new ToxicGrass(newX, newY, 1));
            this.multiply = 0;
        }
    }

}