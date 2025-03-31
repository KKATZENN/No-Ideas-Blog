import GamEnvBackground from './GameEnvBackground.js';
import Player from './Player.js';
import Npc from './Npc.js';
import Quiz from './Quiz.js';
import GameControl from './GameControl.js';

class GameLevelGrass {
    constructer (gameEnv) {
        
        let width = gameEnv.innerWidth;
        let height = gameEnv.innerHeight;
        let path = gameEnv.path;
        
        const image_src_desert = path + "/images/rpg/spritesheet(grass).png"; // be sure to include the path
        const image_data_desert = {
            name: 'grassland',
            greeting: "Welcome to the Grasslands! The air is cool, sun is warm, and the area is wonderfully colorful!",
            src: image_src_desert,
            pixels: {height: 580, width: 1038}
        };

        const sprite_src_playeruno = path + ""; // be sure to include the path
        const PLAYERUNO_SCALE_FACTOR = 5;
        const sprite_data_playeruno = {
            id: `Player 1`,
            greeting: `I love being number 1!`,
            src: sprite_src_playeruno,
            SCALE_FACTOR: playeruno_SCALE_FACTOR,
            STEP_FACTOR: 1000,
            ANIMATION_RATE: 50,
            INIT_POSITION: { x: 0, y: height - (height/PLAYERUNO_SCALE_FACTOR) },
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
    }
}