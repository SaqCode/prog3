function generate(matLen, gr, grEat, pr, eb, tg) {
    let matrix = [];
    for (let i = 0; i < matLen; i++) {
        matrix[i] = [];
        for (let j = 0; j < matLen; j++) {
            matrix[i][j] = 0;
        }
    }

    for (let i = 0; i < gr; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if(matrix[y][x] === 0) {
            matrix[y][x] = 1;
        }
    }

    for (let i = 0; i < grEat; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if(matrix[y][x] === 0) {
            matrix[y][x] = 2;
        }
    }

    for (let i = 0; i < pr; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if(matrix[y][x] === 0) {
            matrix[y][x] = 3;
        }
    }

    for (let i = 0; i < eb; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if(matrix[y][x] === 0) {
            matrix[y][x] = 4;
        }
    }

    for (let i = 0; i < tg; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if(matrix[y][x] === 0) {
            matrix[y][x] = 5;
        }
    }
    return matrix
}


let matrix = generate(15, 45, 10, 6, 3, 25),
    side = window.innerWidth / 30,
    grassArr = [],
    grassEaterArr = [],
    predatorArr = [],
    energyBoosterArr = [],
    toxicGrassArr = [];

function setup() {
    frameRate(5);
    createCanvas(window.innerWidth, window.innerHeight);
    background('#acacac');

    for (let y = 0; y < matrix.length; y++) for (let x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] === 1) grassArr.push(new Grass(x, y));
             else if (matrix[y][x] === 2) grassEaterArr.push(new GrassEater(x, y));
             else if (matrix[y][x] === 3) predatorArr.push(new Predator(x, y));
             else if (matrix[y][x] === 4) energyBoosterArr.push(new EnergyBooster(x, y));
             else if (matrix[y][x] === 5) toxicGrassArr.push(new ToxicGrass(x, y));
                
        }

}

function draw() {

    for (let y = 0; y < matrix.length; y++) for (let x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] === 1) fill("green");
            else if (matrix[y][x] === 0) fill("grey");
            else if (matrix[y][x] === 2) fill("yellow");
            else if (matrix[y][x] === 3) fill("red");
            else if (matrix[y][x] === 4) fill("blue");
            else if (matrix[y][x] === 5) fill("orange");

            rect(x * side, y * side, side, side);
    }
    

    for (const i in grassArr) grassArr[i].mul();
    for (const i in toxicGrassArr) toxicGrassArr[i].mul();
    for (const i in grassEaterArr) grassEaterArr[i].eat();
    for (let i in predatorArr) predatorArr[i].eat();
}