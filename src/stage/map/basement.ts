import { StageObject, Vector } from "../object"
import { Map } from "./map"

export class Basement extends StageObject {
  constructor(chunk: HTMLElement) {
    super()
    this.visible = true
    this.mountElement(chunk)
  }

  get texture(): string {
    return `<span class="mdi mdi-home" style="color: #3f51b5"></span>`
  }

  render() {
    if (this.element) {
      this.element.style.width = `${Map.chunkSize}`
      this.element.style.height = `${Map.chunkSize}`
      this.element.style.userSelect = "none"
      this.element.style.fontSize = `${Map.chunkSize / 3}px`
      this.element.innerHTML = this.texture
    }
  }
}
