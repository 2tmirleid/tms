<script setup>

import ScenarioList from "@/components/ScenarioList.vue";
import ScenarioViewer from "@/components/ScenarioViewer.vue";
import {ref} from "vue";

const selectedScenario = ref(null);

function handleScenarioSelect(scenario) {
  selectedScenario.value = scenario;
}
</script>

<template>
  <main>
    <ScenarioList @select="handleScenarioSelect"/>
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
