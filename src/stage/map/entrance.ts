import { StageObject } from "../object"
import { Map } from "."

export class EnemyEntrance extends StageObject {
  constructor(chunk: HTMLElement) {
    super()
    this.visible = true
    this.mountElement(chunk)
  }

  get texture(): string {
    return `<span class="mdi mdi-login-variant" style="color: #f44336"></span>`
  }

  render() {
    if (this.element) {
      this.element.style.width = `${Map.chunkSize}`
      this.element.style.height = `${Map.chunkSize}`
      this.element.style.userSelect = "none"
      this.element.style.fontSize = "32px"
      this.element.innerHTML = this.texture
    }
  }
}
