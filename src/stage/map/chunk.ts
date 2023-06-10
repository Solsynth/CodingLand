import { StageObject, type StagePopupOptions, Vector } from "../object"
import { Map } from "./map"
import { Wall } from "@/stage/unit/wall"
import { Inventory } from "@/stage/inventory/inventory"
import { useSnackbar } from "@/stores/snackbar"

export class MapChunk extends StageObject {
  public type = "codingland.maps.chunk"

  constructor(position: Vector) {
    super()
    this.position = position
    this.visible = true
    this.element?.classList.add("sgt-map-chunk")
    this.mountElement(document.getElementsByClassName("sgt-map")[0] as HTMLElement)
  }

  renderActions(): StagePopupOptions {
    return {
      icon: (this.children[0] as any)?.texture ?? `<span class="mdi mdi-help-rhombus"></span>`,
      title: (this.children[0] as any)?.attributes.name ?? "Area",
      subtitle: `At ${this.position.toString()}`,
      content: () => import("@/components/actions/area.vue"),
      caller: this,
      attributes: { buildable: this.children[0] == null },
      callbacks: {
        "build.wall": () => {
          if (new Inventory().delItem("codingland.wood", 20)) {
            this.setChild(0, new Wall(this.element as HTMLElement))
            console.debug(`[Actions] Successfully build a wall at ${this.position.toString()}!`)
          } else {
            useSnackbar().show({
              text: `Could not build wall at ${this.position.toString()}, not enough resources.`,
              color: "error"
            })
          }
        }
      }
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
      this.element.style.position = "absolute"
      this.element.style.left = `${(this.position.x ?? 0) * Map.chunkSize}px`
      this.element.style.top = `${(this.position.y ?? 0) * Map.chunkSize}px`
    }
  }
}
