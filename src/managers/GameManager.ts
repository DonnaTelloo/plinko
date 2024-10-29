import * as PIXI from "pixi.js";
import { initDevtools } from "@pixi/devtools";
import { HEIGHT, WIDTH } from "../utils/constants";

export class GameManager {
    private static instance: GameManager;

    private _balance: number;
    public currentBet: number;

    app: PIXI.Application;

    private constructor() {
        this._balance = 2000;
        this.currentBet = 10;
    }

    public static getInstance(): GameManager {
        if (!GameManager.instance) {
            GameManager.instance = new GameManager();
        }
        return GameManager.instance;
    }

    async init() {
        this.app = new PIXI.Application();

        initDevtools({ app: this.app });

        await this.app.init({
            width: WIDTH,
            height: HEIGHT,
            resolution: 1.5,
            backgroundColor: 0xe8e8e8,
            antialias: true
        });

        document.body.appendChild(this.app.canvas);
    }

    get stage() {
        return this.app.stage;
    }

    get balance() {
        return this._balance; // Return the private balance
    }

    set balance(value: number) {
        this._balance = value; // Set the private balance
    }

    updateBet(newBet: number) {
        this.currentBet = newBet;
    }
}
