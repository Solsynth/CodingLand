<template>
  <v-app>
    <v-app-bar>
      <v-app-bar-nav-icon icon="mdi-code-tags"></v-app-bar-nav-icon>

      <v-toolbar-title>{{ $interface.title }}</v-toolbar-title>
    </v-app-bar>

    <v-main class="bg-grey-lighten-3">
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import { useUserInterface } from "@/stores/ui";

const $interface = useUserInterface()
</script>