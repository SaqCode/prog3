import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";

GrassEater = require("./GrassEater");

let matrix;
socket.on("send matrix", matrix1 => {
    matrix = matrix1;
});

side = window.innerWidth / 30,


    function setup() {
        frameRate(5);
        createCanvas(window.innerWidth, window.innerHeight);
        background('#acacac');

        

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