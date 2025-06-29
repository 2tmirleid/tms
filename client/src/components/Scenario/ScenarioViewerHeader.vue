<template>
  <div class="scenario-viewer__header">
    <div
        v-if="!edit"
        class="title__wrapper"
    >
      <h3 id="id">#{{ scenario.id }}</h3>
      <h3 id="title">{{ scenario.title }}</h3>
    </div>

    <div
        v-if="edit"
        class="new-title"
    >
      <input
          type="text"
          class="new-title-input"
          ref="titleInput"
          v-model="scenarioTitle"
          @keyup.esc="cancelEditing"
          @blur="cancelEditing"
          @keyup.enter="submitEditing"
      >
    </div>

    <ContextMenu
        :scenarioID="scenario.id"
        @delete-scenario="deleteScenario"
        @rename-scenario="startEditing"
    />
  </div>
</template>

<script>
import ContextMenu from "@/components/UI/ScenarioContextMenu.vue";
import {ScenarioMethods} from "@/api/scenarioMethods.js";

export default {
  inject: ['showAlert'],
  components: {ContextMenu},
  props: {
    scenario: Object
  },
  data() {
    return {
      scenarioMethods: new ScenarioMethods(),
      scenarioTitle: '',
      edit: false,
    }
  },
  methods: {
    async deleteScenario(id) {
      try {
        await this.scenarioMethods.deleteScenario(id);

        this.$emit('scenario-deleted');
      } catch (error) {
        console.error("Ошибка при удалении сценария:" + error);
        this.showAlert("Не удалось удалить сценарий");
      }
    },
    async startEditing() {
      this.edit = true;

      await this.$nextTick(() => {
        const input = this.$refs.titleInput;
        if (input) {
          input.focus();
        }
      });
    },
    async submitEditing() {
      if (!this.scenarioTitle.trim()) {
        this.showAlert('Название сценария не может быть пустым.');
        return;
      }

      try {
        const body = {"title": this.scenarioTitle.trim()}

        await this.scenarioMethods.updateScenario(this.scenario.id, body);

        this.$emit('scenario-updated', this.scenario.id);
        await this.cancelEditing();
      } catch(error) {
        console.error(`Error while editing scenario title: ${error}`);
        this.showAlert('Что-то пошло не так...');
      }
    },
    async cancelEditing() {
      this.scenarioTitle = this.scenario.title;
      this.edit = false;
    }
  },
  watch: {
    'scenario.title': {
      immediate: true,
      handler(newTitle) {
        this.scenarioTitle = newTitle;
      }
    }
  }
}
</script>

<style scoped>
.scenario-viewer__header {
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 25px;
  padding-left: 10px;
  padding-right: 25px;

  display: flex;
  justify-content: space-between;

  h3 {
    font-weight: normal;
    font-family: var(--font-primary);
    color: #000000;
  }

  #id {
    color: gray;
  }

  #title {
    word-break: break-word;
    white-space: normal;
    overflow-wrap: break-word;
  }
}

.title__wrapper {
  display: flex;
  gap: 20px;
}

.new-title {
  max-width: 700px;
  width: 100%;
}

.new-title .new-title-input {
  font-family: var(--font-primary);
  padding: 5px;
  font-size: 17px;
  outline: none;
  border: none;
  width: 90%;
}
</style>