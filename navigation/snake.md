---
layout: base
title: snakey
permalink: /snakegame/
---

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Snake Game</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background-color: #4099e3;
        }
        canvas {
            background-color: #5838d9;
            border: 1px solid #000;
        display: none;
        border-style: solid;
        border-width: 10px;
        border-color: #FFFFFF;
        }
        #score {
            position: absolute;
            top: 10px;
            left: 10px;
            color: white;
            font-size: 20px;
            font-weight: bold;
        }.wrap{
        margin-left: auto;
        margin-right: auto;
    }
    
    canvas:focus{
        outline: none;
    }

    /* All screens style */
    #gameover p, #setting p, #menu p{
        font-size: 20px;
    }

    #gameover a, #setting a, #menu a{
        font-size: 30px;
        display: block;
    }

    #gameover a:hover, #setting a:hover, #menu a:hover{
        cursor: pointer;
    }

    #gameover a:hover::before, #setting a:hover::before, #menu a:hover::before{
        content: ">";
        margin-right: 10px;
    }

    #menu{
        display: block;
    }

    #gameover{
        display: none;
    }

    #setting{
        display: none;
    }

    #setting input{
        display:none;
    }

    #setting label{
        cursor: pointer;
    }

    #setting input:checked + label{
        background-color: #FFF;
        color: #000;
    }

    </style>

<div class="container">
    <header class="pb-3 mb-4 border-bottom border-primary text-dark">
        <p class="fs-4">Snake score: <span id="score_value">0</span></p>
    </header>
    <div class="container bg-secondary" style="text-align:center;">
        <!-- Main Menu -->
        <div id="menu" class="py-4 text-light">
            <p>Welcome to Snake, press <span style="background-color: #FFFFFF; color: #000000">space</span> to begin</p>
            <a id="new_game" class="link-alert">new game</a>
            <a id="setting_menu" class="link-alert">settings</a>
        </div>
        <!-- Game Over -->
        <div id="gameover" class="py-4 text-light">
            <p>Game Over, press <span style="background-color: #FFFFFF; color: #000000">space</span> to try again</p>
            <a id="new_game1" class="link-alert">new game</a>
            <a id="setting_menu1" class="link-alert">settings</a>
        </div>
        <!-- Play Screen -->
        <canvas id="snake" class="wrap" width="320" height="320" tabindex="1"></canvas>
        <!-- Settings Screen -->
        <div id="setting" class="py-4 text-light">
            <p>Settings Screen, press <span style="background-color: #FFFFFF; color: #000000">space</span> to go back to playing</p>
            <a id="new_game2" class="link-alert">new game</a>
            <br>
            <p>Speed:
                <input id="speed1" type="radio" name="speed" value="120" checked/>
                <label for="speed1">Slow</label>
                <input id="speed2" type="radio" name="speed" value="75"/>
                <label for="speed2">Normal</label>
                <input id="speed3" type="radio" name="speed" value="35"/>
                <label for="speed3">Fast</label>
            </p>
            <p>Wall:
                <input id="wallon" type="radio" name="wall" value="1" checked/>
                <label for="wallon">On</label>
                <input id="walloff" type="radio" name="wall" value="0"/>
                <label for="walloff">Off</label>
            </p>
        </div>
    </div>

</head>
<body>
    <canvas id="gameCanvas" width="400" height="400"></canvas>
    <div id="score">Score: 0</div>

    <script>
        const canvas = document.getElementById("gameCanvas");
        const ctx = canvas.getContext("2d");

        const gridSize = 20;
        let snake, direction, food, score;

        function resetGame() {
            snake = [{ x: 160, y: 160 }];
            direction = { x: gridSize, y: 0 };
            food = generateFood();
            score = 0;
            document.getElementById("score").textContent = "Score: " + score;
            gameLoop();
        }

        function generateFood() {
            const x = Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize;
            const y = Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize;
            return { x, y };
        }

        function gameLoop() {
            if (gameOver()) {
                return alert("Game Over! Your score is: " + score);
            }

            setTimeout(() => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                moveSnake();
                drawSnake();
                drawFood();
                checkFoodCollision();
                gameLoop();
            }, 100);
        }

        let growSnake = false;  // Flag to indicate if the snake should grow

function moveSnake() {
    const head = { ...snake[0] };
    head.x += direction.x;
    head.y += direction.y;

    snake.unshift(head);  // Add the new head at the front

    // Check if the snake has eaten food
    if (isFoodCollision()) {
        score += 1;
        document.getElementById("score").textContent = "Score: " + score;
        food = generateFood();  // Generate new food
        growSnake = true;  // Set flag to grow snake
    }

    if (!growSnake) {
        snake.pop();  // Only remove the tail if snake is not growing
    } else {
        growSnake = false;  // Reset growth flag
    }
}

function gameOver() {
    const head = snake[0];

    // Check for wall collision
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        return true;
    }

    // Check for collision with the snake's body (excluding the head)
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === head.x && snake[i].y === head.y) {
            return true;
        }
    }

    return false;
}

        function changeDirection(event) {
            switch (event.key) {
                case "ArrowUp":
                    if (direction.y === 0) direction = { x: 0, y: -gridSize };
                    break;
                case "ArrowDown":
                    if (direction.y === 0) direction = { x: 0, y: gridSize };
                    break;
                case "ArrowLeft":
                    if (direction.x === 0) direction = { x: -gridSize, y: 0 };
                    break;
                case "ArrowRight":
                    if (direction.x === 0) direction = { x: gridSize, y: 0 };
                    break;
                case " ":
                    resetGame(); // Reset the game when Spacebar is pressed
                    break;
            }
        }

        function drawSnake() {
            snake.forEach(segment => {
                ctx.fillStyle = "light green";
                ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
            });
        }

        function drawFood() {
            ctx.fillStyle = "orange";
            ctx.fillRect(food.x, food.y, gridSize, gridSize);
        }

        function checkFoodCollision() {
            if (snake[0].x === food.x && snake[0].y === food.y) {
                score += 10;
                document.getElementById("score").textContent = "Score: " + score;
                snake.push({ x: food.x, y: food.y });
                food = generateFood();
            }
        }

        function isFoodCollision() {
            return snake[0].x === food.x && snake[0].y === food.y;
        }

        document.addEventListener("keydown", changeDirection);

        // Start the game on load
        resetGame();
        </script>
    </body>
