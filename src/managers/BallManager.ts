import { Ball } from '../entities/Ball';
import { BallFactory } from '../factories/BallFactory';
import {BALL_RADIUS, GRAVITY, HEIGHT, PLINKO_BOARD_HEIGHT, PLINKO_BOARD_WIDTH} from '../utils/Constants';
import {Container} from "pixi.js";

export class BallManager {
    balls: Ball[] = [];

    dropBall(colorType: number) {
        const ball = BallFactory.create(colorType);
        this.balls.push(ball);
        return ball.sprite;
    }


    updateBalls(pegs: Container[]) {
        this.balls.forEach((ball) => {
            pegs.forEach((peg) => {
                if (ball.isColliding(peg)) {
                    ball.velocityY *= -0.7;
                    ball.velocityX = (Math.random() - 0.5) * 5;
                }
            });
            ball.update(GRAVITY, PLINKO_BOARD_HEIGHT, BALL_RADIUS);
        });
    }
}