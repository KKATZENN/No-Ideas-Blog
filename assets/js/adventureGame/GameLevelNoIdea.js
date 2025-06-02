import GameEnv from './GameEngine/GameEnv.js';
import Background from './GameEngine/Background.js';
import PlayerOne from '../adventureGame/PlayerOne.js';
import PlayerTwo from '../adventureGame/PlayerTwo.js';
import NpcFrog from '../adventureGame/NpcFrog.js';
import Mantaray from '../adventureGame/MantaRay.js';
import DialogueSystem from '../adventureGame/GameEngine/DialogueSystem.js';

class GameLevelNoIdea {
  constructor(path) {
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');

    // Values dependent on GameEnv.create()
    let width = GameEnv.innerWidth;
    let height = GameEnv.innerHeight;

    // Background data
    const image_src_water = path + "/images/rpg/water.png";
    const image_data_water = {
        name: 'water',
        src: image_src_water,
        pixels: {height: 580, width: 1038}
    };

    // Player 1 sprite data (turtle)
    const sprite_src_turtle = path + "/images/rpg/turtle.png"; // be sure to include the path
    const turtle_SCALE_FACTOR = 10;
    const sprite_data_turtle = {
        id: 'Turtle',
        greeting: "Turtles go hard ngl",
        src: sprite_src_turtle,
        SCALE_FACTOR: turtle_SCALE_FACTOR,
        STEP_FACTOR: 1000,
        ANIMATION_RATE: 50,
        INIT_POSITION: { x: 0, y: height - (height/turtle_SCALE_FACTOR) }, 
        pixels: {height: 384, width: 512},
        orientation: {rows: 3, columns: 4 },
        down: {row: 0, start: 0, columns: 3 },
        downRight: {row: 1, start: 0, columns: 3, rotate: Math.PI/16 },
        downLeft: {row: 2, start: 0, columns: 3, rotate: -Math.PI/16 },
        left: {row: 2, start: 0, columns: 3 },
        right: {row: 1, start: 0, columns: 3 },
        up: {row: 3, start: 0, columns: 3 },
        upLeft: {row: 2, start: 0, columns: 3, rotate: Math.PI/16 },
        upRight: {row: 1, start: 0, columns: 3, rotate: -Math.PI/16 },
        hitbox: { widthPercentage: 0.45, heightPercentage: 0.2 },
        keypress: { up: 87, left: 65, down: 83, right: 68 }
    };

    // Player 2 sprite data (fish)
    const sprite_src_fish = path + "/images/rpg/fishies.png";
    const sprite_data_fish = {
        name: 'fish',
        src: sprite_src_fish,
        SCALE_FACTOR: 16,
        STEP_FACTOR: 400,
        ANIMATION_RATE: 50,
        pixels: {height: 256, width: 384},
        INIT_POSITION: { x: 0, y: 0 },
        orientation: {rows: 8, columns: 12 },
        down: {row: 0, start: 0, columns: 3 },  // 1st row
        left: {row: 1, start: 0, columns: 3 },  // 2nd row
        right: {row: 2, start: 0, columns: 3 }, // 3rd row
        up: {row: 3, start: 0, columns: 3 },    // 4th row
    };

    // NPC sprite data (frog)
    const sprite_src_frog = path + "/images/rpg/fishies.png";
    const sprite_data_frog = {
        name: 'npc',
        src: sprite_src_frog,
        SCALE_FACTOR: 16,  // Adjust this based on your scaling needs
        ANIMATION_RATE: 50,
        pixels: {height: 256, width: 384},
        INIT_POSITION: { x: (width / 2), y: (height / 2)},
        orientation: {rows: 8, columns: 12 },
        down: {row: 0, start: 9, columns: 3 }, 
        left: {row:1, start: 9, columns: 3},
        right: {row:2, start: 9, columns: 3}, 
        up: {row:3, start: 9, columns: 3},  
        dialogues: [
          "Ribbit.",
          "You hear how a mha fan went to a zoo to uh, might I say, interact with the frogs?",
          "Dont frogs breathe air? Why am I down here",
          "Croak. Oh wait wrong animal."
        ],

        reaction: function() {
          DialogueSystem.showRandomDialogue();
        },

        walkingArea: {
          xMin: width / 10, //left boundary
          xMax: (width * 5 / 7), //right boundary 
          yMin: height / 4, //top boundary 
          yMax: (height * 8 / 15) //bottom boundary
        },

        speed : 5,
        direction: { x: 1, y: 1 },

        updatePosition: function () {
          console.log(`Manta Ray position: (${this.INIT_POSITION.x}, ${this.INIT_POSITION.y})`);
          this.INIT_POSITION.x += this.direction.x * this.speed; // Update x position based on direction and speed
          this.INIT_POSITION.y += this.direction.y * this.speed; // Update y position based on direction and speed

          if (this.INIT_POSITION.x <= this.walkingArea.xMin) {
            this.INIT_POSITION.x = this.walkingArea.xMin;
            this.direction.x = 1; 
          }
          if (this.INIT_POSITION.x >= this.walkingArea.xMax) {
            this.INIT_POSITION.x = this.walkingArea.xMax;
            this.direction.x = -1; 
          }
          if (this.INIT_POSITION.y <= this.walkingArea.yMin) {
            this.INIT_POSITION.y = this.walkingArea.yMin;
            this.direction.y = 1; 
          }
          if (this.INIT_POSITION.y >= this.walkingArea.yMax) {
            this.INIT_POSITION.y = this.walkingArea.yMax;
            this.direction.y = -1; 
          }

          const spriteElement = document.getElementById(this.id);
          if (spriteElement) { 
            spriteElement.style.transform = this.direction.x === -1 ? "scaleX(-1)" : "scaleX(1)";
        }
      },
    };

    const sprite_src_mantaRay = path + "/images/rpg/fishies.png"; // be sure to include the path
    const sprite_greet_mantaRay = "go away";
    const sprite_data_mantaRay = {
        id: 'mantaray',
        greeting: sprite_greet_mantaRay,
        src: sprite_src_mantaRay,
        SCALE_FACTOR: 400,  // Adjust this based on your scaling needs
        ANIMATION_RATE: 25,
        pixels: {height: 1200, width: 1600},
        INIT_POSITION: { x: 100, y: 100 },
        orientation: {rows: 8, columns: 12 },
        down: {row: 5, start: 0, columns: 3 },
        downRight: {row: 5, start: 0, columns: 3, rotate: Math.PI/16 },
        downLeft: {row: 5, start: 0, columns: 3, rotate: -Math.PI/16 },
        right: {row: 6, start: 0, columns: 3 },
        left: {row: 7, start: 0, columns: 3 },
        up: {row: 8, start: 0, columns: 3 },  
        upLeft: {row: 8, start: 0, columns: 3, rotate: Math.PI/16 },
        upRight: {row: 8, start: 0, columns: 3, rotate: -Math.PI/16 },
        hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },

        walkingArea: {
          xMin: width / 10, //left boundary
          xMax: (width * 5 / 7), //right boundary 
          yMin: height / 4, //top boundary 
          yMax: (height * 8 / 15) //bottom boundary
        },

        speed : 5,
        direction: { x: 1, y: 1 },

        updatePosition: function () {
          console.log(`Manta Ray position: (${this.INIT_POSITION.x}, ${this.INIT_POSITION.y})`);
          this.INIT_POSITION.x += this.direction.x * this.speed; // Update x position based on direction and speed
          this.INIT_POSITION.y += this.direction.y * this.speed; // Update y position based on direction and speed

          if (this.INIT_POSITION.x <= this.walkingArea.xMin) {
            this.INIT_POSITION.x = this.walkingArea.xMin;
            this.direction.x = 1; 
          }
          if (this.INIT_POSITION.x >= this.walkingArea.xMax) {
            this.INIT_POSITION.x = this.walkingArea.xMax;
            this.direction.x = -1; 
          }
          if (this.INIT_POSITION.y <= this.walkingArea.yMin) {
            this.INIT_POSITION.y = this.walkingArea.yMin;
            this.direction.y = 1; 
          }
          if (this.INIT_POSITION.y >= this.walkingArea.yMax) {
            this.INIT_POSITION.y = this.walkingArea.yMax;
            this.direction.y = -1; 
          }

          const spriteElement = document.getElementById(this.id);
          if (spriteElement) { 
            spriteElement.style.transform = this.direction.x === -1 ? "scaleX(-1)" : "scaleX(1)";
        }
      },
        update: function() {
            // Skip update if already in killing process
            if (this.isKilling) {
                return;
            }
            
            // Find all player objects
            const players = this.gameEnv.gameObjects.filter(obj => 
                obj.constructor.name === 'Player'
            );
            
            if (players.length === 0) return;
            
            if (this.INIT_POSITION.x <= this.walkingArea.xMin && this.INIT_POSITION.x >= this.walkingArea.xMax && this.INIT_POSITION.y <= this.walkingArea.yMin && this.INIT_POSITION.y >= this.walkingArea.yMax) {

            // Find nearest player
            let nearest = players[0];
            let minDist = Infinity;

            for (const player of players) {
                const dx = player.position.x - this.position.x;
                const dy = player.position.y - this.position.y;
                const dist = Math.sqrt(dx*dx + dy*dy);
                if (dist < minDist) {
                    minDist = dist;
                    nearest = player;
                }
            }

            // Move towards nearest player
            const speed = 1.5; // Adjust speed as needed
            const dx = nearest.position.x - this.position.x;
            const dy = nearest.position.y - this.position.y;
            const angle = Math.atan2(dy, dx);
            
            // Update position
            this.position.x += Math.cos(angle) * speed;
            this.position.y += Math.sin(angle) * speed;
            }
          }
    };

      setInterval(() => {
        sprite_data_mantaRay.updatePosition(); 
      }, 100)
      
      setTimeout(() => {
      // Clean up any lingering resources before reload
        if (self && self.timerInterval) {
          clearInterval(self.timerInterval);
        }
                        
        // Force a complete page reload - most reliable way to reset
        location.reload();
      }, 4000);

    // List of objects defnitions for this level
    this.objects = [
      { class: Background, data: image_data_water },
      { class: PlayerOne, data: sprite_data_turtle },
      { class: PlayerTwo, data: sprite_data_fish },
      { class: NpcFrog, data: sprite_data_frog },
      { class: Mantaray, data: sprite_data_mantaRay}
    ];
  }

}

export default GameLevelNoIdea;