import { Entity } from "./entity"
import { Map } from "../map/map"
import { useStage } from "@/stores/stage"
import { Direction } from "../object"

export class Enemy extends Entity {
  constructor(map: HTMLElement) {
    super(map)
    this.element?.classList.add("sgT-entity-enemy")
  }

  get texture(): string {
    return `<span class="mdi mdi-target-account" style="color: white"></span>`
  }

  private moveCountdown = 20
  private maxMoveCountdown = 20

  locateEndpoint() {
    // TODO Make stage singleton and provide a way to access node direct, we need access map instance to use it getChunk function
  }

  update() {
    // TODO Replace with locateEndpoint()
    if(this.moveCountdown > 0) {
      this.moveCountdown--
    } else {
      this.move(Direction.Up)
      this.moveCountdown = this.maxMoveCountdown
    }
  }

  render(): void {
    if (this.element) {
      super.render()
      this.element.style.backgroundColor = "#f44336"
      this.element.style.userSelect = "none"
      this.element.style.fontSize = `${Map.chunkSize / 3}px`
      this.element.innerHTML = this.texture
    }
  }
}
