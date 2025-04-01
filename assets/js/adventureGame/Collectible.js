import GameObject from "./GameObject";
import Game from "./Game";

class Collectible extends GameObject {

    collectFloweery() {
        if (this.collisionData.touchPoints.other.id === "player") {
            Game.floweeriesClaimed += 1;
            alert(`You collected a Floweery! You now have ${floweeriesClaimed} floweeries!`)
        }
    }   


}

export default Collectible;