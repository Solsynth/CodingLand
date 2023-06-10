<template>
  <div>
    <v-list density="compact" class="flat-actions-list">
      <v-list-subheader>ACTIONS</v-list-subheader>
      <v-list-item prepend-icon="mdi-pickaxe" title="Mine" subtitle="Deploy Resource Miner"
                   :disabled="props.attributes['established']" @click="triggerCallback('mine')" />
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

<style scoped>
.flat-actions-list .v-list-item {
  padding-bottom: 8px !important;
  padding-top: 8px !important;
}
</style>