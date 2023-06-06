<template>
  <v-container fluid class="pa-0 fit-height">
    <div id="sgT-stage" class="fit-width" style="height: calc(100vh - 64px)">
      <div id="sgT-map-wrapper" class="fit-width fit-height"></div>
    </div>
  </v-container>
</template>

<script lang="ts" setup>
import { onMounted } from "vue"
import { useStage } from "@/stores/stage"
import { Map } from "@/stage/map"
import { useRouter } from "vue-router"

const $stage = useStage()
const $router = useRouter()

onMounted(() => {
  const wrapper = document.getElementsByClassName("sgT-stage")[0] as HTMLElement

  if ($stage.instance != null) {
    $stage.instance.rootNode.addChild(new Map())
    $stage.instance.start()
  } else {
    console.error("Launcher isn't finish their work. Game play disabled.")
    console.error("Now auto redirecting to launcher...")

    $router.push({ name: "main.menu.launcher" })
  }
})
</script>

<style>
#sgT-stage {
  position: relative;
}

#sgT-map-wrapper {
  position: absolute;
  display: flex;
  justify-content: center;
  place-items: center;
  left: 0;
  top: 0;
}
</style>
