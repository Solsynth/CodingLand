<template>
  <div class="container">
    <div>
      <div id="options">
        <div style="display: flex; justify-content: space-between">
          <span>CodingLand</span>
          <button @click="generateMap">Start Game</button>
        </div>
      </div>

      <div id="scene" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, watch } from "vue"
import { useGameplayData } from "@/stores/gameplay"
import { EarthMapGenerator } from "@/libs/map-generator"

const $game = useGameplayData()

const tileSize = 20

let sense: HTMLDivElement

function generateMap() {
  $game.map.randomGenerate(new EarthMapGenerator(), 20, 20)
}

function render() {
  // Clear old render result
  while (sense.firstChild) {
    sense.removeChild(sense.firstChild)
  }

  // Set height and width
  sense.style.width = `${tileSize * $game.map.size[0]}px`
  sense.style.height = `${tileSize * $game.map.size[1]}px`
  sense.style.fontSize = `${0}px`

  $game.map.forEach((tile) => {
    const tileElement = document.createElement("div")
    tileElement.style.backgroundColor = tile.material.getColor()
    tileElement.style.height = `${tileSize}px`
    tileElement.style.width = `${tileSize}px`
    tileElement.className = "element-tiles"
    for (const entity of tile.entities) {
      const entityElement = document.createElement("div")
      entityElement.style.backgroundColor = entity.getColor()
      entityElement.style.height = `${tileSize}px`
      entityElement.style.width = `${tileSize}px`
      entityElement.style.borderRadius = "50%"
      entityElement.style.position = "absolute"
      entityElement.className = "entity-tiles"
      tileElement.append(entityElement)
    }
    sense.append(tileElement)
  })
}

onMounted(() => {
  // Setup canvas rendering
  sense = document.getElementById("scene") as HTMLDivElement
})

watch($game.map, () => {
  render()
})
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
}

#scene {
  display: flex;
  flex-wrap: wrap;
}
</style>