class ToxicGrass {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.multiply = 0;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character) {
        let found = [];
        for (let i in this.directions) {
            let x = this.directions[i][0];
            let y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] === character) {
                    found.push(this.directions[i]);
                }
            }
        }

        return found;
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