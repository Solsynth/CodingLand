import { StageObject } from "../object"
import { Map } from "."

export class MapChunk extends StageObject {
  constructor() {
    super()
    this.visible = true
    this.element?.classList.add("sgT-map-chunk")
    this.mountElement(document.getElementsByClassName("sgT-map")[0] as HTMLElement)
  }

  render() {
    if(this.element && this.parent) {
        if(this.parent instanceof Map) {
            this.element.style.border = "1px solid #e4e4e4"
            this.element.style.width = `${this.parent.chunkSize}px`
            this.element.style.height = `${this.parent.chunkSize}px`
        } else {
            throw new Error("Map chunk's parent must be a Map instance!")
        }
    }
  }
}
