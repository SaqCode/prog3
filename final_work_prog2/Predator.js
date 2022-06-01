class Predator {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.energy = 8;
        this.directions = [];
    }
    getNewCoordinates() {
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
        this.getNewCoordinates();
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

    move() {
        this.energy--;
        let emptyCells = this.chooseCell(0);
        let newCell = random(emptyCells);
        if(newCell && this.energy >= 0) {
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
        let newCell = random(emptyCells);
        if(newCell) {
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
            
            if(this.energy >= 12) {
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