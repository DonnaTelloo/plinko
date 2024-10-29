import { Container, Graphics } from "pixi.js";
import { PlinkoBoard } from "../ui/PlinkoBoard";
import { BottomSection } from "../ui/BottomSection";
import { HEIGHT, PLAY_BUTTONS, PLINKO_BOARD_HEIGHT, PLINKO_BOARD_WIDTH, WIDTH } from "../utils/constants";
import { BallManager } from "../managers/BallManager";
import { PegManager } from "../managers/PegManager";
import { BucketManager } from "../managers/BucketManager";
import { GameManager } from "../managers/GameManager";
import {BettingView} from "../ui/BettingView";

export class GameScene extends Container {
    public readonly PlinkoBoard: PlinkoBoard;
    public readonly BottomSection: BottomSection;
    public readonly BallManager: BallManager;
    public readonly PegManager: PegManager;
    public readonly BucketManager: BucketManager;
    public readonly GameManager: GameManager;
    public readonly BettingView: BettingView;

    public readonly Game;

    constructor(game) {
        super();

        this.width = PLINKO_BOARD_WIDTH;
        this.height = PLINKO_BOARD_HEIGHT;
        this.x = (WIDTH - PLINKO_BOARD_WIDTH) / 2; // Center
        this.y = (HEIGHT - PLINKO_BOARD_HEIGHT) / 2; // Center
        this.Game = game;

        this.BallManager = new BallManager();
        this.PegManager = new PegManager();
        this.BucketManager = new BucketManager();
        this.BettingView = new BettingView();
        this.GameManager = GameManager.getInstance();

        const pegs = this.PegManager.createPegs();
        const buckets = this.BucketManager.generateBuckets(pegs.height);

        this.PlinkoBoard = new PlinkoBoard(pegs, buckets);
        this.BottomSection = new BottomSection(this.PlayButtonsHandler.bind(this));

        const ControlPanelView = this.BottomSection.createSection((PLINKO_BOARD_WIDTH - PLINKO_BOARD_WIDTH) / 2, this.PlinkoBoard.getLocalBounds().maxY);

        this.addChild(this.PlinkoBoard);
        this.addChild(ControlPanelView);
    }

    PlayButtonsHandler(type) {

        this.addChild(this.BallManager.dropBall(PLAY_BUTTONS[type].color));

        this.GameManager.balance -= this.GameManager.currentBet;

        console.log(`After action - Bet: ${this.GameManager.currentBet}, Balance: ${this.GameManager.balance}`);

        this.BettingView.updateBalanceText(this.GameManager.balance);

        this.Game.app.ticker.add(() => {
            this.BallManager.updateBalls(this.PegManager.pegs);
        });

        setTimeout(() => this.Game.app.ticker.stop(),10000); // SHEACHERE LOOP!
    }
}
