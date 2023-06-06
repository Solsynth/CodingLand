import { StageObject, Vector } from "../object"
import { Map } from "./map"

export class MapChunk extends StageObject {
  constructor(position: Vector) {
    super()
    this.position = position
    this.visible = true
    this.element?.classList.add("sgT-map-chunk")
    this.mountElement(document.getElementsByClassName("sgT-map")[0] as HTMLElement)
  }

  render() {
    if (this.element && this.parent) {
      this.element.style.display = "flex"
      this.element.style.justifyContent = "center"
      this.element.style.placeItems = "center"
      this.element.style.border = "1px solid #e4e4e4"
      this.element.style.width = `${Map.chunkSize}px`
      this.element.style.height = `${Map.chunkSize}px`
      this.element.style.position = "absolute"
      this.element.style.left = `${(this.position.x ?? 0) * Map.chunkSize}px`
      this.element.style.top = `${(this.position.y ?? 0) * Map.chunkSize}px`
    }
  }
}
