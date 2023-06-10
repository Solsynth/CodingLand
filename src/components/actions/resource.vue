<template>
  <div>
    <v-list density="compact" class="sgt-inspector">
      <v-list-subheader>ACTIONS</v-list-subheader>
      <v-alert v-if="props.attributes['established']" :rounded="0" type="warning" density="compact"
               text="Couldn't execute actions here, it's occupied." />
      <v-list-item prepend-icon="mdi-pickaxe" title="Build Miner" subtitle="Deploy a resource miner"
                   :disabled="props.attributes['established']" @click="triggerCallback('mine')" />
      <v-list-item prepend-icon="mdi-broom" title="Clean up" subtitle="Remove this place resources"
                   :disabled="props.attributes['established']" @click="triggerCallback('clean')" />
    </v-list>
  </div>
</template>

<script lang="ts" setup>
import type { StagePopupOptions } from "@/stage/object"

const props = defineProps<StagePopupOptions>()
const emits = defineEmits(["close"])

function triggerCallback(id: string) {
  props.callbacks[id]()
  emits("close")
}
</script>
