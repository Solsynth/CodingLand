<template>
  <div :style="`opacity: ${props.show ? 1 : 0}`" v-if="show" class="wrapper">
    <div style="min-width: 180px">
      <v-card variant="flat">
        <v-card-text>
          <div>Initializing...</div>
        </v-card-text>
      </v-card>

      <v-progress-linear indeterminate />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue"

const props = defineProps<{ show: boolean }>()

const show = ref(props.show)

watch(props, (v) => {
  if (!v.show) {
    setTimeout(() => (show.value = false), 300)
  }
})

watch(
  show,
  (v) => {
    if (v) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
  },
  { immediate: true }
)
</script>

<style scoped>
.wrapper {
  height: 100vh;
  width: 100%;

  text-align: center;
  display: flex;
  place-items: center;
  justify-content: center;

  transition: all 300ms;
}
</style>
