<template>
  <section class="scenario-list">
    <div class="scenario-list__header">
      header
    </div>

    <ul class="scenarios">
      <li
          class="scenario-preview"
          v-for="(scenario, index) in scenarios"
          :key="index"

          @click="$emit('select', scenario)"
      >

        <span>{{ scenario.title }}</span><span id="id">#{{ scenario.id }}</span>

      </li>
    </ul>

    <ScenarioCreator @scenario-created="handleScenarioCreated"/>
  </section>
</template>

<script>
import {ScenarioMethods} from "@/api/scenarioMethods.js";
import ScenarioCreator from "@/components/ScenarioCreator.vue";

export default {
  components: {ScenarioCreator},

  data() {
    return {
      scenarios: [],
      scenario: {}
    }
  },
  methods: {
    async getScenarios() {
      const scenarioMethods = new ScenarioMethods();

      try {
        const response = await scenarioMethods.getScenariosList();
        this.scenarios = response.data;
      } catch (error) {
        console.error("Error while getting scenarios: ", error);
      }
    },
    async handleScenarioCreated() {
      await this.getScenarios();
    }
  },
  mounted() {
    this.getScenarios();
  }
}
</script>

<style scoped>
.scenario-list {
  width: 40%;
  height: calc(100vh - 60px);
  border: 1px solid #e8edf1;
  background-color: #FFFFFF;
  border-bottom-left-radius: 20px;
  border-top-left-radius: 20px;

  display: flex;
  flex-direction: column;

  .scenarios {
    flex: 1;
    overflow-y: auto;
    padding: 18px 18px 18px 18px;
    list-style: none;

    .scenario-preview {
      padding: 5px 5px 5px 5px;
      border-radius: 5px;
      font-family: "JetBrains Mono", sans-serif;
      font-size: 14px;
      color: #000000;

      display: flex;
      gap: 10px;

      cursor: pointer;

      #id {
        color: gray;
      }
    }

    .scenario-preview:hover {
      background-color: #edf1f5;
    }
  }
}

.scenario-list__header {
  flex-shrink: 0;
  height: 150px;
  border-bottom: 1px solid #e8edf1;
}
</style>