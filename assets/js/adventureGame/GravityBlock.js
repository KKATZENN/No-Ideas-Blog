import NPC from 'Npc.js';
import GameBlock from 'Block.js'

class Faller extends GameBlock {
    constructor(data = null, gameEnv = null) {
        this.width = GameEnv.width;
        this.length = GameEnv.length;
    }
}

export default Faller;