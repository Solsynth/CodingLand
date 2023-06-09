import { Map } from "../map/map"
import { StageObject } from "../object"

export class Wall extends StageObject {
  public type = "codingland.buildings.wall"
  public attributes = { passable: false }

  constructor(chunk: HTMLElement) {
    super()
    this.visible = true
    this.mountElement(chunk)
  }

  get texture(): string {
    return `<span class="mdi mdi-wall"></span>`
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
