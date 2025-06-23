<script setup>
import {onUnmounted, ref, watch} from 'vue'
import ScenarioList from "@/components/Scenario/ScenarioList.vue"
import ScenarioViewer from "@/components/Scenario/ScenarioViewer.vue"
import Sidebar from "@/components/UI/Sidebar.vue";

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
    <Sidebar/>

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
.scenarios-page {
  max-width: 100%;
  padding-top: 48px;
  padding-right: 10px;
  padding-bottom: 10px;
  background-color: #f9fbfb;
  display: flex;
}

@media (max-width: 1440px) {
  .scenarios-page {
    padding: 20px;
    flex-direction: column;
  }
}

</style>