<template>
  <div class="atom--snackbar-provider">
    <v-snackbar v-model="$snackbar.display" v-bind="$snackbar.option">
      <div v-html="$snackbar.option?.text"></div>
    </v-snackbar>
  </div>
</template>

<script lang="ts" setup>
import { useSnackbar } from "@/stores/snackbar"

const $snackbar = useSnackbar()
</script>
