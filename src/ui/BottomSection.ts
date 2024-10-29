import { Container } from "pixi.js";
import {PINS, PLAY_BUTTONS, PLINKO_BOARD_WIDTH} from "../utils/constants";
import { Button } from "./Button";
import { BettingView } from "./BettingView";
import {Pin} from "../entities/Pin";

export class BottomSection {
    protected container: Container;
    public bettingView: BettingView;
    private readonly actionMethod: (buttonName: string) => void;

    private static readonly BUTTON_SPACING = 55;
    private static readonly SECTION_HEIGHT = 60;
    private static readonly SECTION_Y_OFFSET = 20;

    constructor(actionMethod: (buttonName: string) => void) {
        this.actionMethod = actionMethod;
        this.container = new Container();
        this.bettingView = new BettingView();

        this.initializeContainer();
    }

    private initializeContainer(): void {
        this.container.height = BottomSection.SECTION_HEIGHT;
        this.container.width = PLINKO_BOARD_WIDTH;
        this.container.addChild(this.bettingView);
    }

    public createSection(x: number, y: number): Container {
        const playButtons = this.createPlayButtons();
        this.container.addChild(playButtons);
        this.container.position.set(x, y + BottomSection.SECTION_Y_OFFSET);
        return this.container;
    }

    private createPlayButtons(): Container {
        const buttonContainer = new Container();
        const buttons = Object.entries(PLAY_BUTTONS);

        buttons.forEach(([buttonName], index) => {
            const button = new Button(
                buttonName,
                () => this.actionMethod(buttonName),
                index * BottomSection.BUTTON_SPACING,
                0
            );
            buttonContainer.addChild(button.getContainer());
        });

        buttonContainer.x = PLINKO_BOARD_WIDTH - buttonContainer.width;
        return buttonContainer;
    }

    private createPinsView(): Container<any> {
        const PinsContainer = new Container();

        const pins = PINS;

        // pins.forEach(() => {
        //
        //     const pin = new Pin();
        // })
    }
}
