<script setup>

import ScenarioList from "@/components/ScenarioList.vue";
import ScenarioViewer from "@/components/ScenarioViewer.vue";
import {ref} from "vue";

const selectedScenario = ref(null);

function handleScenarioSelect(scenario) {
  selectedScenario.value = scenario;
}

function handleScenarioUpdated(updatedScenarioId) {

  console.log("Updated scenario ID received:", updatedScenarioId);

  if (selectedScenario.value && selectedScenario.value.id === updatedScenarioId) {
    // Создаем новый объект, чтобы форсировать обновление
    selectedScenario.value = { ...selectedScenario.value };
  }
}
</script>

<template>
  <main>
    <ScenarioList
        @select="handleScenarioSelect"
        @scenario-updated="handleScenarioUpdated"
    />
    <ScenarioViewer
        v-if="selectedScenario"
        :key="selectedScenario.id"
        :scenario="selectedScenario"
    />
  </main>
</template>

<style scoped>
@media screen and (min-width: 1440px) {
  main {
    max-width: 100%;
    padding: 48px 10px 10px 200px;
    background-color: #f9fbfb;
    display: flex;
  }
}
</style>
