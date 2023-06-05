<template>
  <v-container class="d-flex justify-center align-center" style="height: 100%">
    <div class="text-center">
      <div class="text-h5">CodingLand</div>
      <div class="text-subtitle-2">Code Your World</div>

      <div class="mt-4">
        <div class="actions">
          <v-btn variant="text" color="primary" :to="{ name: 'main.menu.launcher' }">Start Game</v-btn>
        </div>
      </div>

      <div class="mt-4">
        <div class="text-body-2">v0.1 Closed Preview</div>
      </div>
    </div>
  </v-container>
</template>