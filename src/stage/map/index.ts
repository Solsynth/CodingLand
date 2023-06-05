import { StageObject, Vector } from "../object"
import { MapChunk } from "./chunk"

export class Map extends StageObject {
  public size: Vector
  public chunkSize: number = 50

  constructor(size = new Vector(8, 5)) {
    super()
    this.size = size
    this.visible = true
    this.element?.classList.add("sgT-map")
    this.mountElement(document.getElementById("sgT-map-wrapper") as HTMLElement)

    // Follow size to create chunks
    for (let x = 0; x < (this.size.x ?? 8); x++) {
      for (let y = 0; y < (this.size.y ?? 5); y++) {
        this.addChild(new MapChunk())
      }
    }
  }

  render() {
    if (this.element) {
      this.element.style.width = `${this.chunkSize * (this.size?.x ?? 8)}px`
      this.element.style.height = `${this.chunkSize * (this.size?.y ?? 5)}px`
      this.element.style.display = "flex"
      this.element.style.flexWrap = "wrap"
    }
  }
}
