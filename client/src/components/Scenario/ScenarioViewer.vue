<template>
  <section class="scenario-viewer">
    <ScenarioViewerHeader
      :scenario="localScenario"
      @scenario-deleted="$emit('scenario-deleted')"
      @scenario-updated="handleScenarioUpdatedForList"
    />

    <ScenarioViewerSidebar
        :scenario="localScenario"
        @scenario-updated="handleScenarioUpdated"
    />

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
import ScenarioViewerSidebar from "@/components/Scenario/ScenarioViewerSidebar.vue";
import ScenarioViewerHeader from "@/components/Scenario/ScenarioViewerHeader.vue";

export default {
  components: {ScenarioViewerHeader, ScenarioViewerSidebar, ContextMenu, AddStepButton, ScenarioEditor, EditableField},
  inject: ["showAlert"],
  props: {
    scenario: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      scenarioMethods: new ScenarioMethods(),
      localScenario: {},
      refreshKey: Date.now(),
    }
  },
  methods: {
    handleScenarioUpdated() {
      this.$emit('scenario-updated', this.localScenario.id);
      this.getScenarioByID(this.localScenario.id);
    },
    handleScenarioUpdatedForList() {
      this.handleScenarioUpdated(this.localScenario.id);
      this.$emit('scenario-updated', this.localScenario.id);
    },
    async getScenarioByID(id) {
      try {
        const response = await this.scenarioMethods.getScenarioByID(id);
        this.localScenario = response.data;
      } catch (error) {
        console.error("Error while getting scenario by id: ", error);
        this.showAlert("Что-то пошло не так...")
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
</style>