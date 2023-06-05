import { Map } from "."
import { StageObject } from "../object"

export class ResourcePoint extends StageObject {
  public resource: string

  constructor(chunk: HTMLElement, resource: string) {
    super()
    this.resource = resource
    this.visible = true
    this.mountElement(chunk)
  }

  render() {
    if (this.element) {
      this.element.style.width = `${Map.chunkSize * 0.65}px`
      this.element.style.height = `${Map.chunkSize * 0.65}px`
      this.element.style.borderRadius = "50px"
      this.element.style.backgroundColor = "yellow"
    }
  }
}
