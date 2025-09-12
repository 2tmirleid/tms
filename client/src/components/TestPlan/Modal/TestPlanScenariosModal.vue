<template>
    <div class="test-plan-scenarios-modal">
      <div class="header">
        <TestPlanScenariosModalHeader
            @refresh-scenarios-list="refreshScenarios"
            @found-scenario="handleFoundScenario"
            @scenario-sorted="handleSortScenario"
        />

        <div class="close">
          <CloseButton
              @click="this.$emit('close-modal')"
          />
        </div>
      </div>

      <transition-group
          name="scenario"
          tag="ul"
          class="scenarios"
          appear
      >
        <li
            v-for="scenario in scenarios"
            :key="scenario.id"
            class="scenario-preview"
        >
          <span class="title">
            <span class="checkbox">
              <input
                  type="checkbox"
                  :value="scenario.id"
                  v-model.number="selectedScenarioIDs"
              >
            </span>

            <span class="id">#{{ scenario.id }}</span>
            <span class="status" :style="{ backgroundColor: scenario.status.color }"></span>
            {{ getTrimmedTitle(scenario.title) }}
          </span>
        </li>
      </transition-group>

      <TestPlanScenariosModalUpdater
          @click="updateScenarios(testPlanID)"
      />
    </div>
</template>

<script>
import TestPlanScenariosModalHeader from "@/components/TestPlan/Modal/TestPlanScenariosModalHeader.vue";
import {ScenarioMethods} from "@/api/scenarioMethods.js";
import ScenarioListHeader from "@/components/Scenario/ScenarioListHeader.vue";
import CloseButton from "@/components/UI/Btn/CloseButton.vue";
import TestPlanScenariosModalUpdater from "@/components/TestPlan/Modal/TestPlanScenariosModalUpdater.vue";
import {TestPlanMethods} from "@/api/testPlanMethods.js";

export default {
  components: {TestPlanScenariosModalUpdater, CloseButton, ScenarioListHeader, TestPlanScenariosModalHeader},
  inject: ['showAlert'],
  data() {
    return {
      scenarioMethods: new ScenarioMethods(),
      testPlanMethods: new TestPlanMethods(),
      scenarios: [],
      selectedScenarioIDs: [],
      maxTitleLength: 120,
    }
  },
  props: {
    testPlanID: Number,
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
        const response = await this.scenarioMethods.getScenariosList(this.projectID);
        this.scenarios = response.data.sort((a, b) => a.id - b.id);

        this.selectedScenarioIDs = this.scenarios
            .filter(s => s.test_plan_ids.includes(this.testPlanID))
            .map(s => s.id);
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

    async updateScenarios(id) {
      try {
        const body = {"scenarios": [...this.selectedScenarioIDs]}

        await this.testPlanMethods.updateTestPlan(id, body);
        this.$emit('scenarios-updated');
      } catch (error) {
        console.error("Update scenarios error:" + error);
        this.showAlert('При попытке обновить список сценариев что-то пошло не так...');
      }
    }
  },
  mounted() {
    this.refreshScenarios();
  }
}
</script>

<style scoped>
.test-plan-scenarios-modal {
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  width: 60%;
  height: 60%;
  border: 1px solid var(--border-color);
  background-color: #FFFFFF;
  border-radius: 20px;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.05);
  z-index: 9999;
}

.header {
  position: relative;
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
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

.scenario-preview .checkbox {
  flex-shrink: 0;
}

.scenario-preview .checkbox input[type="checkbox"] {
  appearance: none;
  vertical-align: middle;
  width: 18px;
  height: 18px;
  border: 2px solid var(--border-color);
  border-radius: 4px;
  background-color: #fff;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
}

.scenario-preview .checkbox input[type="checkbox"]:hover {
  border-color: var(--hover-bg);
  background-color: rgba(0, 0, 0, 0.02);
}

.scenario-preview .checkbox input[type="checkbox"]:checked {
  background-color: var(--id-color);
  border-color: var(--id-color);
  text-align: center;
}

.scenario-preview .checkbox input[type="checkbox"]:checked::after {
  content: '';
  position: absolute;
  top: 2px;
  left: 5px;
  width: 4px;
  height: 8px;
  border: solid #fff;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
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