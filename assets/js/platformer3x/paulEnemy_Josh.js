import Character from './Character.js';
import GameEnv from './GameEnv.js';
import GameControl from './GameControl.js';

export class Goomba extends Character {
        constructor(canvas, image, data, xPercentage, yPercentage, name, minPosition){
            super(canvas, image, data);
    
            //Unused but must be Defined
            this.name = name;
            this.y = yPercentage;
    
            //Initial Position of Goomba
            this.x = xPercentage * GameEnv.innerWidth;
    
            //Access in which a Goomba can travel    
            this.minPosition = minPosition * GameEnv.innerWidth;
            this.maxPosition = this.x + xPercentage * GameEnv.innerWidth;
    
            this.immune = 0;
    
            //Define Speed of Enemy
            if (GameEnv.difficulty === "easy") {
                this.speed = this.speed * Math.floor(Math.random() * 1.5 + 2);
            } else if (GameEnv.difficulty === "normal") {
                this.speed = this.speed * Math.floor(Math.random() * 2 + 3);
            } else if (GameEnv.difficulty === "hard") {
                this.speed = this.speed * Math.floor(Math.random() * 3 + 4);
            } else {
                this.speed = this.speed * 5
            }
        }

        explode() {
            const shards = 20; // number of shards
            for (let i = 0; i < shards; i++) {
                const shard = document.createElement('div');
                shard.style.position = 'absolute';
                shard.style.width = '3.5x';
                shard.style.height = '3.5px';
                shard.style.backgroundColor = 'green'; // color of the shards
                shard.style.left = `${this.x}px`;
                shard.style.top = `${this.y}px`;
                this.canvas.parentElement.appendChild(shard); // add shard to the canvas container
    
                const angle = Math.random() * 2 * Math.PI;
                const speed = Math.random() * 5 + 2;
    
                const shardX = Math.cos(angle) * speed;
                const shardY = Math.sin(angle) * speed;
    
                shard.animate([
                    { transform: 'translate(0, 0)', opacity: 1 },
                    { transform: `translate(${shardX * 20}px, ${shardY * 20}px)`, opacity: 0 }
                ], {
                    duration: 1000,
                    easing: 'ease-out',
                    fill: 'forwards'
                });
    
                setTimeout(() => {
                    shard.remove();
                }, 2000);
            }
            this.canvas.style.opacity = 0;
        }

           // Player action on collisions
            collisionAction() {
                if (this.collisionData.touchPoints.other.id === "finishline") {
                    if (this.collisionData.touchPoints.other.left || this.collisionData.touchPoints.other.right) {
                        this.speed = -this.speed;            
                    }
                }
        
                if (this.collisionData.touchPoints.other.id === "player") {
                    // Collision: Top of Josh with Bottom of Player
                    if (this.collisionData.touchPoints.other.bottom && this.immune == 0) {
                        GameEnv.invincible = true;
                        this.explode()
        
                        setTimeout((function() {
                            GameEnv.invincible = false;
                            this.destroy();
                        }).bind(this), 1500);
        
            
                        // Set a timeout to make GameEnv.invincible false after 2000 milliseconds (2 seconds)
                        setTimeout(function () {
                        this.destroy();
                        GameEnv.invincible = false;
                        }, 2000);
                    }
                }
            }
}