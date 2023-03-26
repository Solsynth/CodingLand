<template>
  <q-page padding>
    <div class="indicator">
      <!-- TODO Replace indicator data with Goatworks -->
      <q-card flat bordered>
        <q-card-section>
          <div class="text-h6">Changelogs</div>
          <div class="text-subtitle2">
            Notification
            <q-icon name="mdi-bell-badge" />
          </div>
        </q-card-section>
      </q-card>
      <q-card flat bordered>
        <q-card-section>
          <div class="text-h6">Getting Start</div>
          <div class="text-subtitle2">
            Tutorial
            <q-icon name="mdi-school" />
          </div>
        </q-card-section>
      </q-card>
      <q-card flat bordered>
        <q-card-section>
          <div class="text-h6">Inventory</div>
          <div class="text-subtitle2">
            Stock
            <q-icon name="mdi-package" />
          </div>
        </q-card-section>
      </q-card>
    </div>

    <div class="fit row q-col-gutter-x-md q-mt-md">
      <div class="col-6 offset-3">
        <actions />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import Actions from "@/views/operations/actions.vue"
</script>

<style scoped>
.q-card {
  padding: 0.5em;
}

.indicator {
  display: flex;
  justify-content: center;
  flex-wrap: nowrap;
  width: 100%;
  gap: 1em;
}

.indicator .q-card {
  width: calc(100% / 5);
  min-width: 280px;
  transition: all 300ms linear;
}

.indicator .q-card:hover {
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12) !important;
  transition: all 300ms linear;
}
</style>