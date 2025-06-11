<script setup>
import {onUnmounted, ref, watch} from 'vue'
import ScenarioList from "@/components/Scenario/ScenarioList.vue"
import ScenarioViewer from "@/components/Scenario/ScenarioViewer.vue"

const selectedScenario = ref(null)

const handleScenarioSelect = (scenario) => {
  selectedScenario.value = scenario
}

const handleScenarioUpdated = (updatedScenarioId) => {
  if (selectedScenario.value?.id === updatedScenarioId) {
    selectedScenario.value = { ...selectedScenario.value }
  }
}

onUnmounted(() => {
  selectedScenario.value = null
})
</script>

<template>
  <main class="app-container">
    <ScenarioList
        @select="handleScenarioSelect"
        @scenario-updated="handleScenarioUpdated"
    />

    <ScenarioViewer
        v-if="selectedScenario"
        :key="selectedScenario.id"
        :scenario="selectedScenario"
        @scenario-updated="handleScenarioUpdated"
    />
  </main>
</template>

<style scoped>
.app-container {
  max-width: 100%;
  padding: 48px 10px 10px 200px;
  background-color: #f9fbfb;
  display: flex;
}

@media (max-width: 1440px) {
  .app-container {
    padding: 20px;
    flex-direction: column;
  }
}
</style>