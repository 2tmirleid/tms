<template>
  <div class="failed-stat">
    <ul class="scenarios">
      <li
          class="scenario"
          v-for="(scenario, index) in failedScenarios"
          :key="index"
      >
        <span class="id">#{{ scenario.id }}</span>
        <span class="title">{{ scenario.title }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import {LaunchResultMethods} from "@/api/launchResultMethods.js";

export default {
  data() {
    return {
      launchResultMethods: new LaunchResultMethods(),
      failedScenarios: [],
      expand: false,
      expandedScenarioID: null
    }
  },
  props: {
    launchID: String | Number
  },
  methods: {
    async refreshStat() {
      await this.refreshFailed();
    },
    async refreshFailed() {
      const response = await this.launchResultMethods.getResults(this.launchID);

      for (const result of response.data) {
        const status = result.status;

        if (status.title === 'Не пройден') this.failedScenarios.push(result.scenario);
      }
    }
  },
  mounted() {
    this.refreshStat()
  }
}
</script>

<style scoped>
.failed-stat {
  margin-top: 10px;
  margin-left: 10px;
  border: 2px solid var(--border-color);
  border-radius: 10px;
  transition: ease 0.3s;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.05);
  width: 800px;
  height: 350px;
  cursor: pointer;
  font-family: var(--font-primary);
}

.failed-stat:hover {
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.scenarios {
  list-style: none;
  margin: 0;
  padding: 10px;
}

.scenario {
  display: flex;
  gap: 10px;
  font-size: 14px;
  padding: 5px;
  border-radius: 5px;
  cursor: pointer;
  align-items: center;
}

.scenario .title {
  display: flex;
  align-items: center;
  gap: 6px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  flex: 1;
}

.scenario .id {
  color: var(--id-color);
  flex-shrink: 0;
  min-width: 30px;
  text-align: right;
}

.scenario:hover {
  background-color: #c00000;
  color: #FFF;
}

.scenario:hover .id {
  color: #FFF;
}
</style>