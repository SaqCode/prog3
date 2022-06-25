const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const path = require("path");
const fs = require("fs");
GrassEater = require("./GrassEater.js");
Grass = require("./Grass.js");
Predator = require("./Predator");
ToxicGrass = require("./ToxicGrass");
EnergyBooster = require("./EnergyBooster");

grassArr = [];
grassEaterArr = [];
predatorArr = [];
energyBoosterArr = [];
toxicGrassArr = [];

io.sockets.on("send btn", (callback) => {
    callback(matrix);
})

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
matrix = generate(25, 45, 20, 6, 3, 25);
io.sockets.emit('send matrix', matrix);

async function createObject(matrix) {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] === 1) {
                await grassArr.push(new Grass(x, y));
            } else if (matrix[y][x] === 2) {
                await grassEaterArr.push(new GrassEater(x, y));
            } else if (matrix[y][x] === 3) {
                await predatorArr.push(new Predator(x, y));
            } else if (matrix[y][x] === 4) {
                await energyBoosterArr.push(new EnergyBooster(x, y));
            } else if (matrix[y][x] === 5) {
                await toxicGrassArr.push(new ToxicGrass(x, y));
            }
        }
    }

    io.sockets.emit('send matrix', matrix);
}

function game() {
    for (let i = 0; i < grassArr.length; i++) {
        grassArr[i].mul();
    }
    for (let i in toxicGrassArr) {
        toxicGrassArr[i].mul();
    }
    for (let i in grassEaterArr) {
        grassEaterArr[i].eat();
    }
    for (let i in predatorArr) {
        predatorArr[i].eat();
    }
    io.sockets.emit("send matrix", matrix)
}

app.use(express.static("."));


app.get('/', (req, res) => {
    res.redirect('index.html');
});

setInterval(game, 1000);

function change () {

}

const lox = () => {
    const filepath = path.join(path.resolve(), "state.json");
    fs.promises.writeFile(filepath, JSON.stringify({
        "grasses" : `${grassArr.length}`,
        "grass eaters" : `${grassEaterArr.length}`,
        "predators" : `${predatorArr.length}`,
        "energyBoosters" : `${energyBoosterArr.length}`,
        "toxicGrasses" : `${toxicGrassArr.length}`
    }, null, 2)).then(() => {
        fs.promises.readFile(filepath, "utf8").then(res => {
            console.log(res);
        });
    });
}

io.on('connection', (socket) => {
    createObject(matrix).then(setInterval(lox, 1000));
    socket.on("change", change);
});

server.listen(process.env.PORT || 3000);