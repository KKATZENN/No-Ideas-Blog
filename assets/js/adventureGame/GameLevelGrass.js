import GamEnvBackground from './GameEnvBackground.js';
import Player from './Player.js';
import Player2 from './Player2.js'
import Npc from './Npc.js';
import Quiz from './Quiz.js';
import GameControl from './GameControl.js';


class GameLevelGrass {
    constructer (gameEnv) {
        
        let width = gameEnv.innerWidth;
        let height = gameEnv.innerHeight;
        let path = gameEnv.path;
        
        const image_src_grass = path + "/images/rpg/spritesheet(grass).png"; // be sure to include the path
        const image_data_grass = {
            name: 'grassland',
            greeting: "Welcome to the Grasslands! The air is cool, sun is warm, and the area is wonderfully colorful!",
            src: image_src_desert,
            pixels: {height: 580, width: 1038}
        };

        const sprite_src_plieruno = path + ""; // be sure to include the path
        const PLIERUNO_SCALE_FACTOR = 5;
        const sprite_data_plieruno = {
            id: 'Player 1',
            greeting: 'I love being number 1!',
            src: sprite_src_plieruno,
            SCALE_FACTOR: PLIERUNO_SCALE_FACTOR,
            STEP_FACTOR: 1000,
            ANIMATION_RATE: 50,
            INIT_POSITION: { x: 0, y: height - (height/PLIERUNO_SCALE_FACTOR) },
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
            keypress: { up: 87, left: 65, down: 83, right: 68 } // W, A, S, D
        }

        const sprite_src_plierdoes = path + ""; // be sure to include the path
        const PLIERDOES_SCALE_FACTOR = 5;
        const sprite_data_plierdoes = {
            id: 'Player 2',
            greeting: 'I hate being number 2... :(',
            src: sprite_src_plierdoes,
            SCALE_FACTOR: PLIERDOES_SCALE_FACTOR,
            STEP_FACTOR: 1000,
            ANIMATION_RATE: 50,
            INIT_POSITION: { x: 0, y: height - (height/PLIERDOES_SCALE_FACTOR) },
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
            keypress: { up: 38, left: 37, down: 40, right: 39 } // Arrowkeys
        }

        const sprite_src_endnpc = path + "/images/rpg/villager.png"; // be sure to include the path 
        const ENDNPC_SCALE_FACTOR = 5;
        const sprite_data_endnpc = {
            id: 'End Npc',
            greeting: 'I hate you',
            src: sprite_src_plierdoes,
            SCALE_FACTOR: ENDNPC_SCALE_FACTOR,
            ANIMATION_RATE: 50,
            INIT_POSITION: { x: 400, y: 450},
            pixels: {height: 384, width: 512},
            orientation: {rows: 3, columns: 4 },
            reaction: function() {
                alert("Hey! Watch where you're going.")
            },
            interact: function() {
                alert(this.greeting);

                if (floweeriesClaimed >= 5) {
                    endGame();
                }
            },
        }

        const sprite_src_floweery = path + "/images/rpg/floweery.png"; // be sure to include the path 
        const FLOWEERY_SCALE_FACTOR = 5;
        const sprite_data_floweery = {
            id: 'Floweery',
            greeting: 'Hi!',
            src: sprite_src_plierdoes,
            SCALE_FACTOR: ENDNPC_SCALE_FACTOR,
            ANIMATION_RATE: 50,
            INIT_POSITION: { x: 4, y: 450},
            pixels: {height: 384, width: 512},
            orientation: {rows: 1, columns: 1 },
            reaction: function() {
                    Game.floweeriesClaimed += 1;
                    alert('You collected a Floweery! You now have ${floweeriesClaimed} floweeries!');
            }
        }

    endGame(); {
        this.gameOver = true
        
        const gameContainer = document.getElementById("gameContainer")
        if (!gameContainer) {
            console.error("Game container not found")
            return
        }

    }

        this.classes = [
            { class: GamEnvBackground, data: image_data_grass },
            { class: Player, data: sprite_data_plieruno },
            { class: Player2, data: sprite_data_plierdoes},
            { class: Npc, data: sprite_data_endnpc},
            { class: Object, data: sprite_data_floweery}
        ]
    }
}

export default GameLevelGrass;