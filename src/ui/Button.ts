import * as PIXI from 'pixi.js';
import {PLAY_BUTTONS} from "../utils/constants";
import {Container} from "pixi.js";

export class Button{
    private readonly container: Container<any>;
    constructor(label: string, onClick: () => void, x, y) {

        this.container = new PIXI.Container();
        const buttonGraphic = new PIXI.Graphics();
        buttonGraphic.roundRect(0, 0, 50, 20, 100).fill(PLAY_BUTTONS[label].color);
        this.container.addChild(buttonGraphic);

        const buttonText = new PIXI.Text(label, {
            fontFamily: 'FiraGO',
            fill: 0xffffff, fontSize: 8 });

        buttonText.anchor.set(0.5);
        buttonText.position.set(25, 10);

        this.container.x = x;
        this.container.y = y;
        this.container.interactive = true;
        this.container.buttonMode = true;

        // Handle button clicks
        this.container.on('pointerdown', onClick);
        this.container.addChild(buttonText);
    }
    public getContainer(): Container<any> {
        return this.container;
    }
}