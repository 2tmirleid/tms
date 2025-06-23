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
  <section class="scenarios-page container">
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
  </section>
</template>

<style scoped>

</style>