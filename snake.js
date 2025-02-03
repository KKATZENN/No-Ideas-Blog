const canvas = document.getElementById('snakeGame');
const ctx = canvas.getContext('2d');

const scale = 20;  // Size of each cell
const rows = 20;   // Number of rows
const columns = 20;  // Number of columns

canvas.width = scale * columns;
canvas.height = scale * rows;

let snake = [
    { x: 5, y: 5 },
    { x: 4, y: 5 },
    { x: 3, y: 5 }
];  // Snake starts with 3 cells

let direction = 'RIGHT';
let food = { x: 10, y: 10 };
let score = 0;

// Draw the snake and food
function resetGame() {
    snake = [
        { x: 5, y: 5 },
        { x: 4, y: 5 },
        { x: 3, y: 5 }
    ];
    direction = 'RIGHT';
    nextDirection = 'RIGHT';  // Prevent immediate reverse
    food = generateFood();
    score = 0;

    clearInterval(gameInterval);  // Clear previous game loop
    gameInterval = setInterval(() => {
        update();
        draw();
    }, 100);
}

function draw() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the snake
    snake.forEach((segment, index) => {
        ctx.fillStyle = index === 0 ? 'green' : 'white';  // Head is green, body is white
        ctx.fillRect(segment.x * scale, segment.y * scale, scale, scale);
    });

    // Draw the food
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * scale, food.y * scale, scale, scale);

    // Draw the score
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText('Score: ' + score, 10, 20);
}

// Update the game state
function update() {
    // Move the snake by adding a new head based on the direction
    let head = { ...snake[0] };

    if (direction === 'UP') head.y--;
    if (direction === 'DOWN') head.y++;
    if (direction === 'LEFT') head.x--;
    if (direction === 'RIGHT') head.x++;

    // Check if the snake runs into itself or the wall
    if (head.x < 0 || head.x >= columns || head.y < 0 || head.y >= rows || isCollision(head)) {
        clearInterval(gameInterval);
        alert('Game Over! Press space to play again! Score: ' + score);
        return;
    }

    // Check if the snake eats food
    if (head.x === food.x && head.y === food.y) {
        score++;
        food = generateFood();
    } else {
        snake.pop();  // Remove last segment
    }

    // Add the new head to the snake
    snake.unshift(head);
}

// Check if the snake collides with its body
function isCollision(head) {
    return snake.some(segment => segment.x === head.x && segment.y === head.y);
}

// Generate a new random position for food
function generateFood() {
    let x = Math.floor(Math.random() * columns);
    let y = Math.floor(Math.random() * rows);
    // Ensure food does not spawn inside the snake
    while (isCollision({ x, y })) {
        x = Math.floor(Math.random() * columns);
        y = Math.floor(Math.random() * rows);
    }
    return { x, y };
}

// Handle keyboard input for snake direction
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp' && direction !== 'DOWN') direction = 'UP';
    if (event.key === 'ArrowDown' && direction !== 'UP') direction = 'DOWN';
    if (event.key === 'ArrowLeft' && direction !== 'RIGHT') direction = 'LEFT';
    if (event.key === 'ArrowRight' && direction !== 'LEFT') direction = 'RIGHT';
    if (event.key === `` || event.key === `Spacebar`) resetGame();
});

// Game loop to continuously update the game state
const gameInterval = setInterval(() => {
    update();
    draw();
}, 100);  // Update every 100ms (10 FPS)