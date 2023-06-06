import { StageObject } from "../object"
import { Map } from "../map"

export class Entity extends StageObject {
  public scale: number = 0.5

  constructor(chunk: HTMLElement) {
    super()
    this.visible = true
    this.mountElement(chunk)
  }

  render() {
    if (this.element) {
      this.element.style.width = `${Map.chunkSize * this.scale}px`
      this.element.style.height = `${Map.chunkSize * this.scale}px`
      this.element.style.borderRadius = "50px"
      this.element.style.backgroundColor = "yellow"
    }
  }
}
