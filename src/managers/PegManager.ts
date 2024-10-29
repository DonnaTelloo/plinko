import { PegFactory } from '../factories/PegFactory';
import { PLINKO_BOARD_WIDTH} from '../utils/Constants';
import { Container } from "pixi.js";
import {Peg} from "../entities/Peg";

export class PegManager {
    public pegs: Peg[] = [];
    container = new Container();

    constructor() {
    }

    createPegs() {
        const PINS = 12; // 12, 14, 16
        const startX = PLINKO_BOARD_WIDTH / 2;
        let startY = 0;

        for (let row = 2; row < PINS + 2; row++) {
            const offsetX = startX - (row * 30 / 2);
            for (let col = 0; col <= row; col++){
                const x = offsetX + col * 30;
                const y = startY * 30;
                const peg = PegFactory.create(x, y);
                this.pegs.push(peg.sprite);
                this.container.addChild(peg.sprite);
            }
            startY++
        }
        this.container.y = 5; // PEG RADIUS MG TOP
        return this.container
    }

    get pegs() {
        return this.pegs;
    }
}