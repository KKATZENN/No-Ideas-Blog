import GameObject from "./GameObject";
import Game from "./Game";

class Collectible extends GameObject {

    collectObj() {
        if (this.collisionData.touchPoints.other.id === "player") {

        }
    }   


}

export default Collectible;