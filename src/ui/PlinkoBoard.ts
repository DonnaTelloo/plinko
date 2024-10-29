import {Container, Graphics} from "pixi.js";
import { PLINKO_BOARD_HEIGHT, PLINKO_BOARD_WIDTH} from "../utils/constants";

export class PlinkoBoard extends Container {

    constructor(pegs: Container<any>, buckets: Container<any>){
        super()

        this.drawBoard(pegs, buckets);
    }

    public drawBoard(pegs, buckets){
        const boardWidth = PLINKO_BOARD_WIDTH;
        const boardHeight = PLINKO_BOARD_HEIGHT;

        const background = new Graphics();
        background.rect(0, 0, boardWidth, boardHeight);
        background.fill(0xcccccc);

        this.addChild(pegs);
        this.addChild(buckets);
    }
}