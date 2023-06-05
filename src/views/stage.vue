<template>
  <v-container fluid class="pa-0 fit-height">
    <div class="gEd-stage fit-width" style="height: calc(100vh - 64px)"></div>
  </v-container>
</template>

<script lang="ts" setup>
import { onMounted } from "vue"
import { useStage } from "@/stores/stage"
import { Unit } from '@/stage/unit';
import * as PIXI from 'pixi.js';

const $stage = useStage()

onMounted(() => {
  const wrapper = document.getElementsByClassName("gEd-stage")[0] as HTMLElement

  if ($stage.instance != null) {
    new Unit().init($stage.instance as PIXI.Application)

    window.addEventListener("resize", () => {
      if ($stage.instance != null) {
        $stage.instance.view.width = window.innerWidth
        $stage.instance.view.height = window.innerHeight - 64
        $stage.instance.resize()
      }
    })

    wrapper.appendChild($stage.instance.view as HTMLCanvasElement)
  } else {
    console.error("Launcher isn't finish their work. Stage disabled.")
  }
})
</script>

<style>
.gEd-stage {
  position: relative;
}

.gEd-object {
  transition: all 0.2s;
}
</style>
