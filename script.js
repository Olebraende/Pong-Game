let leftPaddle = document.getElementById("left-paddle");
let rightPaddle = document.getElementById("right-paddle");
let ball = document.getElementById("ball");
let player1ScoreElem = document.getElementById("player1-score");
let player2ScoreElem = document.getElementById("player2-score");
let message = document.getElementById("message"); // For å vise vinnerbeskjed

let leftPaddleY = 150;
let rightPaddleY = 150;
let ballX = 290;
let ballY = 190;
let ballVelocityX = 2;
let ballVelocityY = 2;
let player1Score = 0;
let player2Score = 0;

const PADDLE_HEIGHT = 65;
const PADDLE_SPEED = 5;
const BALL_RADIUS = 7;
const GAME_HEIGHT = 400;
const GAME_WIDTH = 600;
const WINNING_SCORE = 5;

const keyPressed = [];

document.addEventListener("keydown", (e) => {
  keyPressed[e.key] = true;
});

document.addEventListener("keyup", (e) => {
  keyPressed[e.key] = false;
});

function movePaddles() {
  if (keyPressed["w"] && leftPaddleY > 0) {
    leftPaddleY -= PADDLE_SPEED;
  }
  if (keyPressed["s"] && leftPaddleY < GAME_HEIGHT - PADDLE_HEIGHT) {
    leftPaddleY += PADDLE_SPEED;
  }

  if (keyPressed["ArrowUp"] && rightPaddleY > 0) {
    rightPaddleY -= PADDLE_SPEED;
  }
  if (keyPressed["ArrowDown"] && rightPaddleY < GAME_HEIGHT - PADDLE_HEIGHT) {
    rightPaddleY += PADDLE_SPEED;
  }

  leftPaddle.style.top = `${leftPaddleY}px`;
  rightPaddle.style.top = `${rightPaddleY}px`;
}

function moveBall() {
  ballX += ballVelocityX;
  ballY += ballVelocityY;

  if (ballY <= 0 || ballY >= GAME_HEIGHT - BALL_RADIUS * 2) {
    ballVelocityY = -ballVelocityY;
  }

  if (
    ballX <= 10 &&
    ballY >= leftPaddleY &&
    ballY <= leftPaddleY + PADDLE_HEIGHT
  ) {
    ballVelocityX = -ballVelocityX;
  }
  if (
    ballX >= GAME_WIDTH - BALL_RADIUS * 2 - 10 &&
    ballY >= rightPaddleY &&
    ballY <= rightPaddleY + PADDLE_HEIGHT
  ) {
    ballVelocityX = -ballVelocityX;
  }

  if (ballX <= 0) {
    player2Score++;
    resetBall();
  }
  if (ballX >= GAME_WIDTH - BALL_RADIUS * 2) {
    player1Score++;
    resetBall();
  }

  ball.style.left = `${ballX}px`;
  ball.style.top = `${ballY}px`;
}

function resetBall() {
  ballX = GAME_WIDTH / 2 - BALL_RADIUS;
  ballY = GAME_HEIGHT / 2 - BALL_RADIUS;
  ballVelocityX = -ballVelocityX;
}

function updateScore() {
  player1ScoreElem.textContent = player1Score;
  player2ScoreElem.textContent = player2Score;
}

function checkWinner() {
  if (player1Score === WINNING_SCORE) {
    message.textContent = "Spiller 1 har vunnet!";
    message.classList.add("show");
    resetGame();
  } else if (player2Score === WINNING_SCORE) {
    message.textContent = "Spiller 2 har vunnet!";
    message.classList.add("show");
    resetGame();
  }
}

function resetGame() {
  player1Score = 0;
  player2Score = 0;
  updateScore();
  ballX = GAME_WIDTH / 2 - BALL_RADIUS;
  ballY = GAME_HEIGHT / 2 - BALL_RADIUS;
  leftPaddleY = 150;
  rightPaddleY = 150;
  leftPaddle.style.top = `${leftPaddleY}px`;
  rightPaddle.style.top = `${rightPaddleY}px`;

  setTimeout(() => {
    message.classList.remove("show");
  }, 3000);
}

function resetGame() {
  player1Score = 0;
  player2Score = 0;
  updateScore();
  ballX = GAME_WIDTH / 2 - BALL_RADIUS;
  ballY = GAME_HEIGHT / 2 - BALL_RADIUS;
  leftPaddleY = 150;
  rightPaddleY = 150;
  leftPaddle.style.top = `${leftPaddleY}px`;
  rightPaddle.style.top = `${rightPaddleY}px`;

  setTimeout(() => {
    message.textContent = "";
  }, 3000);
}

function gameLoop() {
  moveBall();
  movePaddles();
  updateScore();
  checkWinner();

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
