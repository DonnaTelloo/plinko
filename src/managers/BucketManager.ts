import {
    BALL_RADIUS,
    BUCKET_PRICE, PEG_RADIUS,
    PLAY_BUTTONS,
    PLINKO_BOARD_HEIGHT,
    PLINKO_BOARD_WIDTH
} from "../utils/constants";
import {Container} from "pixi.js";
import {BucketFactory} from "../factories/BucketFactory";

export class BucketManager {
    buckets: [] = []
    container = new Container();

    constructor() {
        this.container.x = (PLINKO_BOARD_WIDTH - (13 * 30)) / 2;
        this.container.y = 0;
    }

    generateBuckets(startingY): Container<any>{
        const PINS = 12;
        const COLUMN = Object.keys(BUCKET_PRICE).length;

        for (let col = 0; col < COLUMN; col++) {
            const offsetY = startingY + (col * 20);
            const BucketList =  Object.entries(BUCKET_PRICE[12]);
            const BucketColor = BucketList[col][0];
            for (let row = 0; row <= PINS; row++){
                const x = row * 30;
                const bucketPrice = BucketList[col][1][row];
                const bucket = BucketFactory.create(bucketPrice, PLAY_BUTTONS[BucketColor].color, x, offsetY);
                this.buckets.push(bucket);
                this.container.addChild(bucket.sprite);
            }
        }
        return this.container;
    }
}