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
          @dblclick="handleTitleDbClick(scenario.id)"
      >
        <span
            v-if="editedTitleID !== scenario.id"
            class="title"
        >
          {{ scenario.title }}
          <span
              class="id"
          >
            #{{ scenario.id }}
          </span>
        </span>

        <input
            v-else
            type="text"
            ref="scenarioInput"
            v-model="updatedScenarioTitle"
            class="new-scenario-title"
            :placeholder="scenario.title"
            @blur="editedTitleID = 0"
            @keyup.enter="updateScenarioTitle(scenario.id)"
        />
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
      scenario: {},
      isNewTitle: false,
      editedTitleID: 0,
      updatedScenarioTitle: ''
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
    },
    handleTitleDbClick(id) {
      this.editedTitleID = id;
      this.isNewTitle = true;

      this.$nextTick(() => {
        if (this.$refs.scenarioInput && this.$refs.scenarioInput[0]) {
          this.$refs.scenarioInput[0].focus();
        }
      });
    },
    async updateScenarioTitle(id) {
      try {
        const scenarioMethods = new ScenarioMethods();

        await scenarioMethods.updateScenario(id, 'title', this.updatedScenarioTitle);

        this.isNewTitle = false;
        this.editedTitleID = 0;
        this.updatedScenarioTitle = '';

        await this.getScenarios();

        this.$emit('scenario-updated', id);

      } catch (e) {
        console.error("Error while saving new title: ", e);
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

      .title {
        display: flex;
        gap: 10px;
      }

      .id {
        color: gray;
      }
    }

    .scenario-preview:hover {
      background-color: #edf1f5;
    }
  }
}

.new-scenario-title {
  width: 40%;

  padding: 5px 5px 5px 10px;

  font-family: "JetBrains Mono", sans-serif;
  font-size: 14px;
  font-weight: normal;

  background: #FFFFFF;
  border: 1px solid #e8edf1;
  border-radius: 10px;

  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;

  outline: none;
}

.scenario-list__header {
  flex-shrink: 0;
  height: 150px;
  border-bottom: 1px solid #e8edf1;
}
</style>