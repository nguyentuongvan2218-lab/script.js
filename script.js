const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
const scoreDisplay = document.getElementById("score");
const gameOverText = document.getElementById("game-over-text");

let score = 0;
let isAlive = true;

function jump() {
    if (!dino.classList.contains("jump") && isAlive) {
        dino.classList.add("jump");
        setTimeout(function () {
            dino.classList.remove("jump");
        }, 500);
    }
}

// Bấm phím Cách (Space) để nhảy trên máy tính hoặc chạm màn hình trên điện thoại
document.addEventListener("keydown", function (event) {
    if (event.code === "Space") {
        if (!isAlive) {
            resetGame();
        } else {
            jump();
        }
    }
});

document.addEventListener("touchstart", function () {
    if (!isAlive) {
        resetGame();
    } else {
        jump();
    }
});

// Vòng lặp kiểm tra va chạm liên tục
let checkDead = setInterval(function () {
    let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("bottom"));
    let cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"));

    // Kiểm tra nếu xương rồng chạm trúng vị trí khủng long
    if (cactusLeft > 50 && cactusLeft < 90 && dinoTop <= 40) {
        // Dừng trò chơi
        cactus.style.animation = "none";
        cactus.style.left = `${cactusLeft}px`;
        isAlive = false;
        gameOverText.style.display = "block";
    } else if (isAlive && cactusLeft < 0) {
        // Tăng điểm khi vượt qua xương rồng thành công
        score++;
        scoreDisplay.innerText = "Điểm: " + Math.floor(score / 10);
    }
}, 10);

function resetGame() {
    isAlive = true;
    score = 0;
    scoreDisplay.innerText = "Điểm: 0";
    gameOverText.style.display = "none";
    cactus.style.left = "580px";
    cactus.style.animation = "cactus-block 1.5s infinite linear";
}
