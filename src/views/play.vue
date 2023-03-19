<template>
  <q-page style="display: flex; justify-content: center; align-items: center">
    <div>
      <div id="scene" />
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import { onMounted, watch } from "vue"
import { useGameInstance } from "@/stores/instance"

const $instance = useGameInstance()

const tileSize = 20

let sense: HTMLDivElement

function render() {
  // Clear old render result
  while (sense?.firstChild) {
    sense.removeChild(sense.firstChild)
  }

  // Set height and width
  sense.style.width = `${tileSize * $instance.map.size[0]}px`
  sense.style.height = `${tileSize * $instance.map.size[1]}px`
  sense.style.fontSize = `${0}px`

  $instance.map.forEach((tile) => {
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
  // Setup rendering
  sense = document.getElementById("scene") as HTMLDivElement

  // First time render
  render()
})

watch($instance.map, () => {
  render()
}, { deep: true })
</script>

<style scoped>
#scene {
  display: flex;
  flex-wrap: wrap;
}
</style>