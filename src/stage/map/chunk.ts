import { StageObject } from "../object"
import { Map } from "."
import { ResourcePoint } from "./resource"

export class MapChunk extends StageObject {
  constructor() {
    super()
    this.visible = true
    this.element?.classList.add("sgT-map-chunk")
    this.mountElement(document.getElementsByClassName("sgT-map")[0] as HTMLElement)

    if (Math.random() > 0.5) {
      this.addChild(new ResourcePoint(this.element as HTMLElement, "codingland.wood"))
    }
  }

  render() {
    if (this.element && this.parent) {
      this.element.style.display = "flex"
      this.element.style.justifyContent = "center"
      this.element.style.placeItems = "center"
      this.element.style.border = "1px solid #e4e4e4"
      this.element.style.width = `${Map.chunkSize}px`
      this.element.style.height = `${Map.chunkSize}px`
    }
  }
}
