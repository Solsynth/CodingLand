import { Map } from "@/libs/map"
import type { IMapGenerator } from "@/libs/map-generator"
import { RobotEntity } from "@/libs/entities/robot"

export type LoggerLevel = "debug" | "info" | "warning" | "error" | "fatal"

export class GameInstance {
  // Game map
  map: Map

  // Robots of the game
  get robots() {
    const robots: { [name: string]: RobotEntity } = {}
    this.map.forEach((tile) => {
      for (const entity of tile.entities) {
        if (entity instanceof RobotEntity) {
          robots[entity.name] = entity
        }
      }
    })
    return robots
  }

  // Player inventory
  inventory: { [id: string]: number } = {}

  // Messages in game
  messages: { level: LoggerLevel, message: string }[] = []

  // Game time
  inGameTime = 0

  constructor(randomGenerator?: IMapGenerator) {
    this.map = new Map([], { x: 20, y: 20 })
    randomGenerator != null && this.newGame(randomGenerator)
  }

  newGame(randomGenerator: IMapGenerator) {
    randomGenerator.generate(this.map.size.x, this.map.size.y)
    randomGenerator.placeRobot(1).forEach((v) => {
      if (v instanceof RobotEntity) {
        this.robots[v.name] = v
      }
    })

    this.map.tiles = randomGenerator.tiles
  }

  start(): number {
    return setInterval(() => {
      this.doUpdate()
      this.inGameTime++
    }, 100)
  }

  pause(id: number) {
    clearInterval(id)
  }

  doUpdate() {
    this.map.forEach((tile) => {
      tile.material.whenUpdate(this)
      for (const entity of tile.entities) {
        entity.whenUpdate(this)
        console.log(entity.tasks)
        for (let i = 0; i < entity.tasks.length; i++) {
          console.log(entity.tasks[i])
          if (entity.beforeExecuteTask(this, entity.tasks[i])) {
            entity.tasks[i].action(this)
          }
          if (entity.tasks[i].destroyable) {
            entity.tasks.splice(i)
          }
        }
      }
    })
  }
}