import {GameScene} from "./scenes/GameScene";
import {GameManager} from "./managers/GameManager";


const gameManager = new GameManager();

(async () => {
    await gameManager.init();
    const gameScene = new GameScene(gameManager);

    gameManager.stage.addChild(gameScene);
})();