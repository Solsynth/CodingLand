<template>
  <q-card class="q-pa-md">
    <q-card-section>
      <div class="text-h6">Inventory</div>
      <div class="text-subtitle2">
        Resources
        <q-icon name="mdi-package" />
      </div>
    </q-card-section>
    <q-card-section class="q-pt-none" style="width: 540px">
      <div class="text-subtitle1">Backpacks</div>
      <materials-list class="q-pa-md" />
      <div class="text-subtitle1">Warehouse</div>
      <materials-list global class="q-pa-md" />
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import MaterialsList from "@/components/materials-list.vue"
</script>