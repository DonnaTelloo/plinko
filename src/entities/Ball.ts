import {BALL_RADIUS} from "../utils/constants";

export class Ball {
    constructor(public sprite: PIXI.Graphics, public velocityX = 0, public velocityY = 0) {}

    update(gravity: number, screenHeight: number, radius: number) {
        this.velocityY += gravity;
        this.sprite.x += this.velocityX;
        this.sprite.y += this.velocityY;

        if (this.sprite.y > screenHeight - radius) {
            this.sprite.y = screenHeight - radius;
            this.velocityY *= -0.7;
        }
    }

    isColliding(peg: PIXI.Graphics): boolean {
        const ball_x = this.sprite.x;
        const ball_y = this.sprite.y;

        const ball_r = BALL_RADIUS;
        const peg_x = peg.x;
        const peg_y = peg.y;
        const peg_r = 5;

        let circleDistance = (peg_x - ball_x) * (peg_x - ball_x) + (peg_y - ball_y) * (peg_y - ball_y);
        return circleDistance <= ((peg_r + ball_r) * (peg_r + ball_r))
    }
}