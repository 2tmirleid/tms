<template>
  <section class="scenario-list">
    <div class="scenario-list-header">
      header
    </div>

    <ul class="scenarios">
      <li
          class="scenario-preview"
          v-for="(scenario, index) in scenarios"
          :key="index"
      >
        <a :href="scenario.id">
          <span>{{ scenario.title }}</span><span id="id">#{{ scenario.id }}</span>
        </a>
      </li>
    </ul>
  </section>
</template>

<script>
import {ScenarioMethods} from "@/api/scenarioMethods.js";

export default {
  data() {
    return {
      scenarios: [],
    }
  },
  methods: {
    async getScenarios() {
      const scenarioService = new ScenarioMethods();

      try {
        const response = await scenarioService.getScenariosList();
        this.scenarios = response.data;
      } catch (error) {
        console.error("Error while getting scenarios: ", error);
      }
    }
  },
  mounted() {
    this.getScenarios();
  }
}
</script>

<style scoped>
.scenario-list {
  width: 600px;
  height: calc(100vh - 60px);
  border: 1px solid teal;

  .scenarios {
    padding: 18px 18px 18px 18px;
    list-style: none;

    display: flex;
    flex-direction: column;

    .scenario-preview {
      padding: 5px 5px 5px 5px;
      border-radius: 5px;

      a {
        text-decoration: none;
        font-family: Poppins, sans-serif;
        font-size: 14px;
        color: #000000;

        display: flex;
        gap: 10px;
      }

      #id {
        color: gray;
      }
    }

    .scenario-preview:hover {
      background-color: #edf1f5;
    }
  }
}

.scenario-list-header {
  height: 150px;
  border-bottom: 1px solid teal;
}
</style>