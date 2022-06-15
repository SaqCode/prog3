class GrassEater extends LivingCreator {
    constructor(x, y) {
        super(x, y)
        this.energy = 8;
        this.directions = [];
    }
    chooseCell(character1) {
        super.getNewCoordinates();
        return super.chooseCell(character1);
    }

    mul() {
        let emptyCells = this.chooseCell(0);
        let newCell = random(emptyCells);

        if (newCell) {
            let newX = newCell[0];
            let newY = newCell[1];
            matrix[newY][newX] = 2;

            let newGrassEater = new GrassEater(newX, newY);
            grassEaterArr.push(newGrassEater);
            this.energy = 8;
        }
    }

    move() {
        this.energy--;
        let emptyCells = this.chooseCell(0, 4);
        let newCell = random(emptyCells);
        if (newCell && this.energy >= 0) {
            let newX = newCell[0];
            let newY = newCell[1];
            matrix[newY][newX] = matrix[this.y][this.x];
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;
        } else {
            this.die();
        }
    }

    eat() {
        let emptyCells = this.chooseCell(1),
            newCell = random(emptyCells),
            emptyCells1 = this.chooseCell(4),
            newCell1 = random(emptyCells1),
            emptyCells2 = this.chooseCell(5),
            newCell2 = random(emptyCells2);

        if (newCell) {
            this.energy++;
            let newX = newCell[0];
            let newY = newCell[1];
            matrix[newY][newX] = matrix[this.y][this.x];
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;

            for (let i in grassArr) if (newX === grassArr[i].x && newY === grassArr[i].y) {
                grassArr.splice(i, 1);
                break;
            }

            if (this.energy >= 12) this.mul();

        } else this.move();

        if (newCell1) {
            this.energy += 15;
            let newX = newCell1[0];
            let newY = newCell1[1];
            matrix[newY][newX] = matrix[this.y][this.x];
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;
            for (let i in energyBoosterArr) {
                if (newX === energyBoosterArr[i].x && newY === energyBoosterArr[i].y) {
                    energyBoosterArr.splice(i, 1);
                    break;
                }
            }
            if (this.energy >= 12) {
                this.mul();
            }
        } else {
            this.move();
        }

        if (newCell2) {
            this.energy -= 10;
            let newX = newCell2[0];
            let newY = newCell2[1];
            matrix[newY][newX] = matrix[this.y][this.x];
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;
            for (let i in toxicGrassArr) {
                if (newX === toxicGrassArr[i].x && newY === toxicGrassArr[i].y) {
                    toxicGrassArr.splice(i, 1);
                    break;
                }
            }
            if (this.energy >= 12) {
                this.mul();
            }
        } else {
            this.move();
        }
    }


    die() {
        matrix[this.y][this.x] = 0;
        for (let i in grassEaterArr) {
            if (this.x === grassEaterArr[i].x && this.y === grassEaterArr[i].y) {
                grassEaterArr.splice(i, 1);
                break;
            }
        }
    }
}