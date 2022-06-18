const LivingCreator = require("./LivingCreator");

module.exports = class Predator extends LivingCreator {
    constructor(x, y) {
        super(x, y);
        this.energy = 8;
        this.directions = [];
    }

    chooseCell(character) {
        super.getNewCoordinates();
        return super.chooseCell(character);
    }

    move() {
        this.energy--;
        let emptyCells = this.chooseCell(0);
        let newCell = emptyCells[Math.floor(Math.random() * emptyCells.length + 1)];
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
        let emptyCells = this.chooseCell(2);
        let newCell = emptyCells[Math.floor(Math.random() * emptyCells.length + 1)];
        if (newCell) {
            this.energy++;
            let newX = newCell[0];
            let newY = newCell[1];
            matrix[newY][newX] = matrix[this.y][this.x];
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;
            for (let i in grassEaterArr) {
                if (newX === grassEaterArr[i].x && newY === grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
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
        for (let i in predatorArr) {
            if (this.x === predatorArr[i].x && this.y === predatorArr[i].y) {
                predatorArr.splice(i, 1);
                break;
            }
        }
    }
}