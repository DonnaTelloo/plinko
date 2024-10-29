import * as PIXI from 'pixi.js';
import { Ball } from '../entities/Ball';
import {BALL_RADIUS, PLINKO_BOARD_WIDTH} from '../utils/Constants';

export class BallFactory {
    static create(colorType): Ball {
        const sprite = new PIXI.Graphics();
        sprite.circle(0, 0, BALL_RADIUS).fill(colorType);
        sprite.x = PLINKO_BOARD_WIDTH / 2;
        sprite.y = -10;

        return new Ball(sprite);
    }
}