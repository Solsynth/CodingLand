<template>
  <div>
    <v-list density="compact" class="sgt-inspector" lines="two">
      <v-list-subheader>STATUS</v-list-subheader>
      <v-list-item prepend-icon="mdi-bow-arrow" title="Damage" :subtitle="`${(props.caller as any).damage} Points`" />
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

function triggerCallback(id: string) {
  props.callbacks[id]()
  emits("close")
}
</script>