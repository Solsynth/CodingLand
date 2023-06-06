import { useStage } from "@/stores/stage"

export class Vector {
  public x?: number
  public y?: number

  constructor(x?: number, y?: number) {
    this.x = x
    this.y = y
  }

  clone(): Vector {
    return new Vector(this.x, this.y)
  }

  static rangeRandom(minX: number, maxX: number, minY: number, maxY: number) {
    return new Vector(
      Math.floor(Math.random() * (maxX - 1 - minX + 1) + minX),
      Math.floor(Math.random() * (maxY - 1 - minY + 1) + minY)
    )
  }

  equals(v: Vector): boolean {
    return v.x === this.x && v.y === this.y
  }
}

export class Direction {
  public static Up = new Vector(0, 1)
  public static Right = new Vector(1, 0)
  public static Left = new Vector(-1, 0)
  public static Down = new Vector(0, -1)
}

export class StageObject {
  public id: string = `sgT-object-${crypto.randomUUID()}`

  // Element for display
  // Keep `undefined` to skip render lifecycle
  public element?: HTMLElement

  public position: Vector
  public direction: Vector

  public children: StageObject[] = []
  public parent?: StageObject
  public nodeDepth: number = 0

  get visible(): boolean {
    return this.element != null
  }

  set visible(v: boolean) {
    if (v && !this.element) {
      this.element = document.createElement("div")
      this.element.id = this.id
    } else if (this.element) {
      this.unmountElement()
    }
  }

  constructor() {
    this.position = new Vector()
    this.direction = Direction.Up
  }

  doesOverlap(o: StageObject) {
    if (o.visible && o.element && this.visible && this.element) {
      const rect1 = this.element.getBoundingClientRect()
      const rect2 = o.element.getBoundingClientRect()
      return !(
        rect1.top > rect2.bottom ||
        rect1.right < rect2.left ||
        rect1.bottom < rect2.top ||
        rect1.left > rect2.right
      )
    } else {
      return false
    }
  }

  replaceChild(index: number, o: StageObject) {
    this.children[index]?.dispose()
    this.children[index] = o
    this.children[index].parent = this
    this.children[index].nodeDepth = this.nodeDepth + 1
  }

  addChild(o: StageObject) {
    o.setParent(this)
  }

  setParent(o: StageObject) {
    this.parent = o
    this.nodeDepth = o.nodeDepth + 1
    o.children.push(this)
  }

  mountElement(target?: HTMLElement) {
    if (this.element) {
      const element = target ?? document.getElementById("sgT-stage")
      element?.appendChild(this.element)
    }
  }

  unmountElement() {
    if (this.element) {
      document.getElementById(this.id)?.remove()
    }
  }

  addSignalListener(id: string, callback: any) {
    useStage().instance?.addSignalListener(id, callback)
  }

  emitSignal(id: string, ...args: any[]) {
    useStage().instance?.foreachSignalListener(id, (handler) => {
      handler(...args)
    })
  }

  dispose() {
    this.unmountElement()
    this.children = []
    if (this.parent) {
      this.parent.children = this.parent.children.filter((node) => node.id !== this.id)
    }
  }

  render() {}

  update() {}
}
