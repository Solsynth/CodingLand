export class StageEventBus {
  private static instance: StageEventBus

  private hooks: { [id: string]: any } = {}

  constructor() {
    if (!StageEventBus.instance) {
      StageEventBus.instance = this
    }
    return StageEventBus.instance
  }

  addListener(id: string, callback: any) {
    this.hooks[id] = callback
  }

  emit(id: string, ...args: any[]) {
    console.debug(`[EventBus] Emitted an event ${id}.`)
    Object.entries(this.hooks).forEach(([k, v]) => {
      if (k === id) {
        v(...args)
      }
    })
  }
}
