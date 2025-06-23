<template>
  <section class="scenario-viewer">
    <div class="scenario-viewer__header">
      <div class="title__wrapper">
        <h3 id="id">#{{ localScenario.id }}</h3>
        <h3 id="title">{{ localScenario.title }}</h3>
      </div>

      <ContextMenu
        :scenarioID="localScenario.id"
        @delete-scenario="deleteScenario"
      />
    </div>

    <div class="scenario-viewer__content">
      <EditableField
          :id="localScenario.id"
          name="description"
          label="Описание"
          :value="localScenario.description"
          @scenario-updated="handleScenarioUpdated"
      />

      <EditableField
          :id="localScenario.id"
          name="precondition" 
          label="Предусловие"
          :value="localScenario.precondition"
          @scenario-updated="handleScenarioUpdated"
      />

      <div class="scenario">
        <div class="content">

          <ScenarioEditor
              :scenarioID="localScenario.id"
              :scenarioSteps="localScenario.steps"
              @scenario-updated="handleScenarioUpdated"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import {ScenarioMethods} from "@/api/scenarioMethods.js";
import EditableField from "@/components/UI/EditableField.vue";
import ScenarioEditor from "@/components/UI/ScenarioEditor.vue";
import AddStepButton from "@/components/UI/Btn/AddStepButton.vue";
import ContextMenu from "@/components/UI/ScenarioContextMenu.vue";

export default {
  components: {ContextMenu, AddStepButton, ScenarioEditor, EditableField},
  props: {
    scenario: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      scenarioMethods: new ScenarioMethods(),
      localScenario: {}
    }
  },
  methods: {
    handleScenarioUpdated() {
      this.$emit('scenario-updated', this.localScenario.id);
      this.getScenarioByID(this.localScenario.id);
    },
    async getScenarioByID(id) {
      try {
        const response = await this.scenarioMethods.getScenarioByID(id);
        this.localScenario = response.data;
      } catch (error) {
        console.error("Error while getting scenarios: ", error);
        alert("Что-то пошло не так...")
      }
    },
    async deleteScenario(id) {
      try {
        await this.scenarioMethods.deleteScenario(id);

        this.$emit('scenario-deleted');
      } catch (error) {
        console.error("Ошибка при удалении сценария:" + error);
        alert("Не удалось удалить сценарий");
      }
    },
  },
  watch: {
    'scenario.id': {
      immediate: true,
      deep: true,
      handler(newID) {
        if (newID) {
          this.getScenarioByID(newID);
        }
      }
    }
  }
}
</script>

<style scoped>
.scenario-viewer {
  width: 60%;
  border-top: 1px solid var(--border-color);
  border-right: 1px solid var(--border-color);
  border-bottom: 1px solid var(--border-color);
  background-color: #FFFFFF;
  border-bottom-right-radius: 20px;
  border-top-right-radius: 20px;

  padding: 25px 10px 10px 40px;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.05);
}

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
</style>