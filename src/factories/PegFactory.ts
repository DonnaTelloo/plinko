import * as PIXI from 'pixi.js';
import { Peg } from '../entities/Peg';
import { PEG_RADIUS } from '../utils/Constants';

export class PegFactory {
    static create(x: number, y: number): Peg {
        const sprite = new PIXI.Graphics();
        sprite.x = x;
        sprite.y = y;
        sprite.circle(0, 0, PEG_RADIUS).fill(0xFF5722);

        return new Peg(sprite);
    }
}