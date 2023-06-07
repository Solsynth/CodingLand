import { Map } from "./map"
import { StageObject } from "../object"

export class ResourcePoint extends StageObject {
  public type = "codingland.buildings.resource"

  public resource: string

  constructor(chunk: HTMLElement, resource: string) {
    super()
    this.resource = resource
    this.visible = true
    this.mountElement(chunk)
  }

  get texture(): string {
    switch (this.resource) {
      case "codingland.wood":
        return `<span class="mdi mdi-pine-tree-variant"></span>`
      default:
        return `<span class="mdi mdi-help-rhombus-outline"></span>`
    }
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
