import NPC from 'Npc.js';
import GameBlock from 'Block.js'

class Faller extends GameBlock {
    constructor(data = null, gameEnv = null) {
        const gravity = true;
        this.width = GameEnv.width;
        this.length = GameEnv.length;
        this.startTime = Date.now();
        this.duration = data.TRANSLATE_SIMULATION.miliseconds;
    }

    gravitationalPull() {
        if(gravity) {
            this.gravitypull = true;
            
            if (this.y < 0 || GameBlock.collisionData.touchPoints.other.top) {
                this.gravitypull = false;
            }
        }

    }

    checkFloor() {
        if (this.y = 0) {

        }
    }
}

export default Faller;