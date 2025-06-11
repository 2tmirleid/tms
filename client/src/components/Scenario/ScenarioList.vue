<template>
  <section class="scenario-list">
    <div class="scenario-list__header">
      header
    </div>

    <ul class="scenarios">
      <li
          v-for="scenario in scenarios"
          :key="scenario.id"
          class="scenario-preview"
          @click="$emit('select', scenario)"
          @dblclick="startEditTitle(scenario)"
      >
        <template v-if="editedTitleID !== scenario.id">
          <span class="title">
            {{ scenario.title }}
            <span class="id">#{{ scenario.id }}</span>
          </span>
        </template>

        <input
            v-else
            ref="titleInput"
            v-model="updatedScenarioTitle"
            class="new-scenario-title"
            :placeholder="scenario.title"
            @blur="cancelEdit"
            @keyup.enter="saveTitle(scenario.id)"
            @keyup.esc="cancelEdit"
        />
      </li>
    </ul>

    <ScenarioCreator @scenario-created="refreshScenarios"/>
  </section>
</template>

<script>
import {ScenarioMethods} from "@/api/scenarioMethods.js";
import ScenarioCreator from "@/components/Scenario/ScenarioCreator.vue";

export default {
  components: {ScenarioCreator},

  data: () => ({
    scenarios: [],
    editedTitleID: 0,
    updatedScenarioTitle: '',
    scenarioMethods: new ScenarioMethods()
  }),

  methods: {
    async refreshScenarios() {
      try {
        const response = await this.scenarioMethods.getScenariosList();
        this.scenarios = response.data;
      } catch (error) {
        console.error("Fetch scenarios error:", error);
      }
    },

    startEditTitle(scenario) {
      this.editedTitleID = scenario.id;
      this.updatedScenarioTitle = scenario.title;

      this.$nextTick(() => {
        if (this.$refs.titleInput?.length) {
          const input = this.$refs.titleInput[0];
          input.focus();
        }
      });
    },

    cancelEdit() {
      this.editedTitleID = 0;
      this.updatedScenarioTitle = '';
    },

    async saveTitle(id) {
      try {
        const body = { "title": this.updatedScenarioTitle.trim() || this.scenarios.find(s => s.id === id).title }

        await this.scenarioMethods.updateScenario(id, body);

        await this.refreshScenarios();
        this.$emit('scenario-updated', id);
        this.cancelEdit();
      } catch (error) {
        console.error("Update title error:", error);
      }
    }
  },

  mounted() {
    this.refreshScenarios();
  }
}
</script>

<style scoped>
.scenario-list {
  width: 40%;
  height: calc(100vh - 60px);
  border: 1px solid var(--border-color);
  background-color: #FFFFFF;
  border-radius: 20px 0 0 20px;

  display: flex;
  flex-direction: column;
}

.scenario-list__header {
  flex-shrink: 0;
  height: 150px;
  border-bottom: 1px solid var(--border-color);
}

.scenarios {
  flex: 1;
  overflow-y: auto;
  padding: 18px;
  list-style: none;
}

.scenario-preview {
  display: flex;
  font-family: var(--font-primary);
  font-size: 14px;
  padding: 5px;
  border-radius: 5px;
  gap: 10px;
  transition: background-color 0.2s ease;
  cursor: pointer;
}

.scenario-preview .title {
  display: flex;
  gap: 10px;
}

.scenario-preview .title .id {
  color: var(--id-color);
}

.scenario-preview:hover {
  background-color: var(--hover-bg);
}

.new-scenario-title {
  width: 100%;

  font-family: var(--font-primary);
  font-size: 14px;
  font-weight: normal;

  background: none;
  border: none;
  outline: none;
}
</style>