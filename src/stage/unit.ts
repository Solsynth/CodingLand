import UnitTexture from "@/assets/image/sprite.png"
import * as PIXI from 'pixi.js';

export class Unit {
    public sprite: PIXI.Sprite

    constructor() {
        this.sprite = PIXI.Sprite.from(UnitTexture)
    }

    init(app: PIXI.Application) {
        app.stage.addChild(this.sprite)

        let elapsed = 0.0;
        app.ticker.add((delta) => {
            elapsed += delta;
            this.sprite.x = 100.0 + Math.cos(elapsed/50.0) * 100.0;
        })
    }
}