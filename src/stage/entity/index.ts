import { StageObject } from "../object"
import { Map } from "../map"

export class Entity extends StageObject {
  public scale: number = 0.5

  constructor(map: HTMLElement) {
    super()
    this.visible = true
    this.mountElement(map)
  }

  render() {
    if (this.element) {
      this.element.style.position = "absolute"
      this.element.style.width = `${Map.chunkSize * this.scale}px`
      this.element.style.height = `${Map.chunkSize * this.scale}px`
      this.element.style.left = `${(this.position.x ?? 0) * Map.chunkSize}px`
      this.element.style.top = `${(this.position.y ?? 0) * Map.chunkSize}px`
      this.element.style.borderRadius = "50px"
      this.element.style.backgroundColor = "#009688"
      this.element.style.boxShadow =
        "0 3px 1px -2px var(--v-shadow-key-umbra-opacity, rgba(0, 0, 0, .2)),0 2px 2px 0 var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, .14)),0 1px 5px 0 var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, .12))"
    }
  }
}
