export class Vector {
  public x?: number
  public y?: number

  constructor(x?: number, y?: number) {
    this.x = x
    this.y = y
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
