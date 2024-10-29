import { Container, Text, Graphics } from "pixi.js";
import { GameManager } from "../managers/GameManager";

export class BettingView extends Container {
    public gameManager: GameManager;
    public currentBet: Text;
    public balanceText: Text;

    constructor() {
        super();
        this.gameManager = GameManager.getInstance();
        this.currentBet = this.createText(this.gameManager.currentBet.toString(), 10);
        this.balanceText = this.createText(`Balance - ${this.gameManager.balance}`, 12);

        this.drawView();
    }

    private createText(text: string, fontSize: number): Text {
        return new Text(text, {
            fill: 0xffffff,  // Fixed incorrect color definition (0xfff -> 0xffffff)
            fontFamily: 'FiraGO',
            fontSize: fontSize,
        });
    }

    private createButton(label: string, onClick: () => void): Container {
        const button = new Container();
        const buttonGraphic = new Graphics();
        buttonGraphic.beginFill(0x4b58b8).drawRect(0, 0, 15, 10).endFill();

        const buttonText = this.createText(label, 15);
        buttonText.anchor.set(0.5);
        buttonText.x = buttonGraphic.width / 2;
        buttonText.y = buttonGraphic.height / 2;

        button.addChild(buttonGraphic);
        button.addChild(buttonText);
        button.interactive = true;
        button.buttonMode = true;
        button.on('pointerdown', onClick);

        return button;
    }

    private drawView(): void {
        this.x = 0;
        this.y = 0;

        const bg = new Graphics();
        bg.beginFill(0x333).drawRect(0, 0, 200, 60).endFill();

        const bettingContainer = new Container();

        const increaseButton = this.createButton('+', () => {
            const bet = Number.parseInt(this.currentBet.text) + 10;
            this.updateBet(bet);
        });

        const decreaseButton = this.createButton('-', () => {
            const currentBetValue = Number.parseInt(this.currentBet.text);
            if (currentBetValue > 10) {
                const bet = currentBetValue - 10;
                this.updateBet(bet);
            }
        });

        bettingContainer.addChild(increaseButton);
        bettingContainer.addChild(decreaseButton);
        bettingContainer.y = 20;

        this.currentBet.x = 25;
        bettingContainer.addChild(this.currentBet);

        increaseButton.x = 45;

        this.balanceText.y = 5;
        this.addChild(this.balanceText);
        this.addChild(bettingContainer);
    }

    private updateBet(newBet: number): void {
        this.currentBet.text = newBet.toString();
        this.gameManager.updateBet(newBet);
        this.updateBalanceText(this.gameManager.balance);
    }

    public updateBalanceText(balance: number): void {
        this.balanceText.text = `Balance - ${this.gameManager.balance}`;  // Update existing text
        console.log(this.renderable)
    }
}
