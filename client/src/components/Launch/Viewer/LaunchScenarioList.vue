<template>
  <div class="launch-scenario-list">
    <div class="header">
      <LaunchScenarioListHeader
          @refresh-scenarios-list="refreshScenarios"
          @found-scenario="handleFoundScenario"
          @scenario-sorted="handleSortScenario"
      />
    </div>

    <transition-group
        name="scenario"
        tag="ul"
        class="scenarios"
        appear
    >
      <li
          v-for="result in results"
          :key="result.id"
          class="scenario-preview"
          @click.stop="this.$emit('scenario-selected', [result.scenario, result])"
      >
          <span class="title">
            <span class="id">#{{ result.scenario.id }}</span>
            <span class="status" :style="{ backgroundColor: result.status.color }"></span>
            {{ getTrimmedTitle(result.scenario.title) }}
          </span>
      </li>
    </transition-group>
  </div>
</template>

<script>
import {LaunchResultMethods} from "@/api/launchResultMethods.js";
import LaunchScenarioListHeader from "@/components/Launch/LaunchScenarioListHeader.vue";
import TestPlanScenariosModalHeader from "@/components/TestPlan/Modal/TestPlanScenariosModalHeader.vue";

export default {
  components: {TestPlanScenariosModalHeader, LaunchScenarioListHeader},
  inject: ['showAlert'],
  data() {
    return {
      launchResultMethods: new LaunchResultMethods(),
      results: [],
      scenarios: [],
      route: null,
      router: null,
    }
  },
  props: {
    launchID: Number,
    projectID: Number | String,
  },
  methods: {
    getTrimmedTitle(title) {
      const max = this.maxTitleLength;
      if (!title || typeof title !== 'string') return '';
      return title.length > max ? title.slice(0, max) + '...' : title;
    },
    async refreshScenarios() {
      try {
        const response = await this.launchResultMethods.getResults(this.launchID);
        this.results = response.data.sort((a, b) => a.scenario.id - b.scenario.id);
      } catch (error) {
        console.error("Fetch scenarios error:" + error);
        this.showAlert('При попытке получить список сценариев что-то пошло не так...');
      }
    },
    async handleFoundScenario(scenario) {
      this.scenarios = Array.isArray(scenario.data) ? scenario.data : [scenario.data];
    },
    async handleSortScenario(type) {
      switch (type) {
        case 'sort_asc':
          this.scenarios = this.scenarios.sort((a, b) => a.id - b.id);
          return;
        case 'sort_desc':
          this.scenarios = this.scenarios.sort((a, b) => b.id - a.id);
          return;
        case 'sort_alphabet':
          this.scenarios.sort((a, b) => a.title.localeCompare(b.title));
          return;
        case 'sort_status':
          this.scenarios.sort((a, b) => a.status.id - b.status.id);
          return;
      }
    },
    updateUrl() {
      if (this.projectID && this.launchID && this.projectID !== 'undefined' && this.launchID !== 'undefined') {
        const expectedPath = `/project/${this.projectID}/launches/${this.launchID}`;

        if (this.$route.path !== expectedPath) {
          window.history.replaceState({}, '', expectedPath);
        }
      }
    }
  },
  mounted() {
    this.refreshScenarios();
    this.updateUrl();
  },
  watch: {
    projectID() {
      this.updateUrl();
    },
    launchID() {
      this.updateUrl();
    }
  }
}
</script>

<style scoped>
.launch-scenario-list {
  position: relative;

  height: calc(100vh - 60px);
  width: 40%;
  border: 1px solid var(--border-color);
  background-color: #FFFFFF;
  border-radius: 20px 0 0 20px;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.05);

  display: flex;
  flex-direction: column;
}

.scenarios {
  flex: 1;
  overflow-y: auto;
  padding: 15px 18px 0 18px;
  list-style: none;
}

.scenario-preview {
  display: flex;
  gap: 10px;
  font-family: var(--font-primary);
  font-size: 14px;
  padding: 5px;
  border-radius: 5px;
  transition: background-color 0.2s ease;
  cursor: pointer;
  align-items: center;
}

.scenario-preview .title {
  display: flex;
  align-items: center;
  gap: 6px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  flex: 1;
}

.scenario-preview .title .id {
  color: var(--id-color);
  flex-shrink: 0;
  min-width: 30px;
  text-align: right;
}

.scenario-preview:hover {
  background-color: var(--hover-bg);
}

.scenario-preview .status {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  display: inline-block;
  vertical-align: middle;
  flex-shrink: 0;
}

/* Анимация появления */
.scenario-enter-active {
  transition: all 0.4s ease;
}

.scenario-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.scenario-enter-to {
  opacity: 1;
  transform: translateX(0);
}

/* Анимация удаления */
.scenario-leave-active {
  transition: all 0.4s ease;
  position: absolute;
}

.scenario-leave-from {
  opacity: 1;
  transform: translateX(0);
}

.scenario-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
</style>