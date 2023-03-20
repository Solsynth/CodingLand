import { Map } from "@/libs/map"
import type { IMapGenerator } from "@/libs/map-generator"
import type { RobotEntity } from "@/libs/entities/robot"

export class GameInstance {
  // Game map
  map: Map

  // Robots of the game
  robots: { [name: string]: RobotEntity } = {}

  // Player inventory
  inventory: { [id: string]: number } = {}

  constructor(randomGenerator?: IMapGenerator) {
    this.map = new Map([], { x: 20, y: 20 })
    randomGenerator != null && this.start(randomGenerator)
  }

  start(randomGenerator: IMapGenerator) {
    if (randomGenerator != null) {
      randomGenerator.generate(this.map.size.x, this.map.size.y)
      randomGenerator.placeRobot(1).forEach((v) => this.robots[v.name] = v)
      this.map.tiles = randomGenerator.tiles
    }
  }
}