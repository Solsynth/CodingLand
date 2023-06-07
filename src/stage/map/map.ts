import { StageObject, Vector } from "../object"
import { ResourcePoint } from "./resource"
import { MapChunk } from "./chunk"
import { Entrance } from "./entrance"
import { Basement } from "./basement"
import { Enemy } from "../entity/enemy"
import { Wall } from "./wall"

export class Map extends StageObject {
  public type = "codingland.map"

  public static chunkSize: number = 96

  public size = new Vector()

  constructor(size = new Vector(8, 5)) {
    super()
    this.size.x = size.x ?? 8
    this.size.y = size.y ?? 5
    this.visible = true
    this.element?.classList.add("sgT-map")
    this.mountElement(document.getElementById("sgT-map-wrapper") as HTMLElement)

    // Add signal listener
    this.addEventListener("codingland.spawn.enemy", (pos: Vector) => {
      const mob = new Enemy(this.element as HTMLElement)
      mob.position = pos
      this.addChild(mob)
    })

    // Follow size to create chunks
    let total = 0
    console.log("[Map Creator] Start initialization map chunks...")
    for (let x = 0; x < this.size.x; x++) {
      for (let y = 0; y < this.size.y; y++) {
        const chunk = new MapChunk(new Vector(x, y))

        if (Math.random() > 0.75) {
          chunk.addChild(new Wall(chunk.element as HTMLElement))
        } else if (Math.random() > 0.45) {
          chunk.addChild(new ResourcePoint(chunk.element as HTMLElement, "codingland.wood"))
        }

        this.addChild(chunk)
        console.debug(`[Map Creator] Created a map chunk at: (${x}, ${y}).`)
        total++
      }
    }

    // TODO Fix maybe random to same position
    // Append additional components
    const additional = {
      entrance: this.getChunk(Vector.rangeRandom(0, this.size.x, 0, this.size.y)),
      basement: this.getChunk(Vector.rangeRandom(0, this.size.x, 0, this.size.y))
    }
    additional.entrance.setChild(0, new Entrance(additional.entrance.element as HTMLElement))
    additional.basement.setChild(0, new Basement(additional.basement.element as HTMLElement))

    console.log(`[Map Creator] Finish map chunk initialization, total created ${total} chunks.`)
  }

  getChunk(position: Vector): MapChunk {
    const v = position.clone()
    v.x = Math.floor(v.x ?? 0)
    v.y = Math.floor(v.y ?? 0)
    return this.children.filter((child) => child.position.equals(v))[0]
  }

  render() {
    if (this.element) {
      this.element.style.width = `${Map.chunkSize * (this.size?.x ?? 8) + 2}px`
      this.element.style.height = `${Map.chunkSize * (this.size?.y ?? 5) + 2}px`
      this.element.style.border = "1px solid #e4e4e4"
      this.element.style.position = "relative"
    }
  }
}
