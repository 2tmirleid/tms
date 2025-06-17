<template>
  <section class="scenario-list">
    <ScenarioListHeader
        @refresh-scenarios-list="refreshScenarios"
        @found-scenario="handleFoundScenario"
    />

    <ul class="scenarios">
      <li
          v-for="scenario in scenarios"
          :key="scenario.id"
          class="scenario-preview"
          @click="$emit('select', scenario)"
          @dblclick="startEditTitle(scenario)"
          @mouseenter="toggleShowDeleteIcon(scenario.id)"
          @mousedown="toggleShowDeleteIcon"
          @mouseleave="toggleShowDeleteIcon"
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

        <DeleteButton v-if="showDeleteIcon && scenario.id === deletingTitleID"
                      @click.stop="deleteScenario(scenario.id)"/>
      </li>
    </ul>

    <ScenarioCreator @scenario-created="refreshScenarios"/>
  </section>
</template>

<script>
import {ScenarioMethods} from "@/api/scenarioMethods.js";
import ScenarioCreator from "@/components/Scenario/ScenarioCreator.vue";
import DeleteButton from "@/components/UI/Btn/DeleteButton.vue";
import ScenarioListHeader from "@/components/Scenario/ScenarioListHeader.vue";

export default {
  components: {ScenarioListHeader, DeleteButton, ScenarioCreator},

  data: () => ({
    scenarios: [],
    editedTitleID: 0,
    deletingTitleID: 0,
    updatedScenarioTitle: '',
    showDeleteIcon: false,
    scenarioMethods: new ScenarioMethods()
  }),

  methods: {
    async refreshScenarios() {
      try {
        const response = await this.scenarioMethods.getScenariosList();
        this.scenarios = response.data;
      } catch (error) {
        console.error("Fetch scenarios error:" + error);
      }
    },
    async handleFoundScenario(scenario) {
      this.scenarios.length = 0;
      this.scenarios.push(scenario.data);
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
        const body = {"title": this.updatedScenarioTitle.trim() || this.scenarios.find(s => s.id === id).title}

        await this.scenarioMethods.updateScenario(id, body);

        await this.refreshScenarios();
        this.$emit('scenario-updated', id);
        this.cancelEdit();
      } catch (error) {
        console.error("Update title error:" + error);
      }
    },

    toggleShowDeleteIcon(id) {
      setTimeout(() => {
        this.deletingTitleID = id;
        this.showDeleteIcon = !this.showDeleteIcon;
      }, 1000);
    },
    async deleteScenario(id) {
      try {
        await this.scenarioMethods.deleteScenario(id);

        this.deletingTitleID = 0;
        await this.refreshScenarios();
      } catch (error) {
        console.error("Ошибка при удалении шага:" + error);
        alert("Не удалось удалить шаг");
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
  --border-color: #e8edf1;
  --hover-bg: #edf1f5;
  --id-color: #6c757d;
  --font-primary: "JetBrains Mono", monospace, sans-serif;

  position: relative;
  width: 40%;
  height: calc(100vh - 60px);
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
  padding: 18px;
  list-style: none;
}

.scenario-preview {
  display: flex;
  justify-content: space-between;
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