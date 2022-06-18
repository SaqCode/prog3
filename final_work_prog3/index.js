const socket = io();

function setup() {
    // frameRate(5);
    createCanvas(window.innerWidth, window.innerHeight);
}

function gameFunc(matrix) {
    
    for (let y = 0; y < matrix.length; y++) {


        for (let x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] === 1) {
                fill("green");
                rect(x * side, y * side, side, side);
            } else if (matrix[y][x] === 0) {
                fill("grey");
                rect(x * side, y * side, side, side);
            } else if (matrix[y][x] === 2) {
                fill("yellow");
                rect(x * side, y * side, side, side);
            } else if (matrix[y][x] === 3) {
                fill("red");
                rect(x * side, y * side, side, side);
            } else if (matrix[y][x] === 4) {
                fill("blue");
                rect(x * side, y * side, side, side);
            } else if (matrix[y][x] === 5) {
                fill("orange");
                rect(x * side, y * side, side, side);
            }

        }
    }
}

setInterval(() => {
    socket.on("send matrix", gameFunc);
}, 1000);

side = window.innerWidth / 30;

