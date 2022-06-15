const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const fs = require("fs");
const GrassEater = require("./GrassEater.js");
const Grass = require("./Grass.js");
const Predator = require("./Predator");
const ToxicGrass = require("./ToxicGrass");
const EnergyBooster = require("./EnergyBooster");

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
        if (matrix[y][x] === 0) {
            matrix[y][x] = 1;
        }
    }

    for (let i = 0; i < grEat; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[y][x] === 0) {
            matrix[y][x] = 2;
        }
    }

    for (let i = 0; i < pr; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[y][x] === 0) {
            matrix[y][x] = 3;
        }
    }

    for (let i = 0; i < eb; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[y][x] === 0) {
            matrix[y][x] = 4;
        }
    }

    for (let i = 0; i < tg; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[y][x] === 0) {
            matrix[y][x] = 5;
        }
    }
    return matrix
}

function createObject (matrix) {
    for (let y = 0; y < matrix.length; y++) for (let x = 0; x < matrix[y].length; x++) {

        if (matrix[y][x] === 1) grassArr.push(new Grass(x, y));
        else if (matrix[y][x] === 2) grassEaterArr.push(new GrassEater(x, y));
        else if (matrix[y][x] === 3) predatorArr.push(new Predator(x, y));
        else if (matrix[y][x] === 4) energyBoosterArr.push(new EnergyBooster(x, y));
        else if (matrix[y][x] === 5) toxicGrassArr.push(new ToxicGrass(x, y));

    }

    io.sockets.emit('send matrix', matrix);
}

const matrix = generate(25, 45, 20, 6, 3, 25);
io.sockets.emit('send matrix', matrix);

app.use(express.static("."));

grassArr = [],
grassEaterArr = [],
predatorArr = [],
energyBoosterArr = [],
toxicGrassArr = [];

app.get('/', (req, res) => {
    res.redirect('index.html');
});


server.listen(3000);