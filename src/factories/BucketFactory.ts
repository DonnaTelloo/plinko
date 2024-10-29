import {Container, Graphics, Text} from 'pixi.js'
import {Bucket} from "../entities/Bucket";

export class BucketFactory {
    static create(bucketPrice: number, color: number,  x: number, y: number){
        const container = new Container();

        const square = new Graphics();
        square.rect(0, 0, 27, 15);
        square.fill(color);

        container.addChild(square);

        const text = new Text({
            text: bucketPrice,style: {
                fontFamily: 'FiraGO',
                fontSize: 10,
                fill: 0xffffff,
                align: 'center',
            }});

        text.anchor.set(0.5);
        text.x = square.width / 2;
        text.y = square.height / 2;

        container.addChild(text);

        container.x = x;
        container.y = y;

        return new Bucket(container);
    }
}