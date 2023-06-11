<template>
  <div>
    <v-list density="compact" class="sgt-inspector" lines="two">
      <v-list-subheader>STATUS</v-list-subheader>
      <v-list-item prepend-icon="mdi-heart" title="Health"
                   :subtitle="`${(props.caller as any).health}/${(props.caller as any).maxHealth}`" />
      <v-list-item prepend-icon="mdi-gold" title="Output" :subtitle="output" />
    </v-list>
    <v-list density="compact" class="sgt-inspector">
      <v-list-subheader>ACTIONS</v-list-subheader>
      <v-list-item prepend-icon="mdi-close" title="Destroy" subtitle="Destroy itself"
                   @click="triggerCallback('destroy')" />
    </v-list>
  </div>
</template>

<script lang="ts" setup>
import type { StagePopupOptions } from "@/stage/object"
import type { ResourceMiner } from "@/stage/unit/miner"
import { computed } from "vue"

const props = defineProps<StagePopupOptions>()
const emits = defineEmits(["close"])

const output = computed(() => {
  const caller = props.caller as ResourceMiner
  return `${caller.outputCount} ${caller.product}/${caller.maxCountdown} ticks`
})

function triggerCallback(id: string) {
  props.callbacks[id]()
  emits("close")
}
</script>
