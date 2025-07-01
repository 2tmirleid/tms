<script setup>
import {onUnmounted, ref} from 'vue'
import ScenarioList from "@/components/Scenario/ScenarioList.vue"
import ScenarioViewer from "@/components/Scenario/ScenarioViewer.vue"
import Sidebar from "@/components/Sidebar.vue";

const selectedScenario = ref(null);
const scenarioListRef = ref(null);

const handleScenarioSelect = (scenario) => {
  selectedScenario.value = scenario
}

const handleScenarioUpdated = (updatedScenarioId) => {
  if (selectedScenario.value?.id === updatedScenarioId) {
    selectedScenario.value = { ...selectedScenario.value }
  }

  scenarioListRef.value?.refreshScenarios?.();
}

const handleScenarioDeleted = () => {
  scenarioListRef.value?.refreshScenarios?.();
  selectedScenario.value = null;
};

onUnmounted(() => {
  selectedScenario.value = null
})
</script>

<template>
  <section class="scenarios-page container">
    <Sidebar/>

    <ScenarioList
        ref="scenarioListRef"
        @select="handleScenarioSelect"
        @scenario-updated="handleScenarioUpdated"
    />

    <ScenarioViewer
        v-if="selectedScenario && selectedScenario.id"
        :key="selectedScenario.id"
        :scenario="selectedScenario"
        @scenario-updated="handleScenarioUpdated"
        @scenario-deleted="handleScenarioDeleted"
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