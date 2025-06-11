<template>
  <section class="scenario-viewer">
    <div class="scenario-viewer__header">
      <h3 id="id">#{{ localScenario.id }}</h3>
      <h3>{{ localScenario.title }}</h3>
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

export default {
  components: {AddStepButton, ScenarioEditor, EditableField},
  props: {
    scenario: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      localScenario: {}
    }
  },
  methods: {
    handleScenarioUpdated() {
      this.$emit('scenario-updated', this.localScenario.id);
      this.getScenarioByID(this.localScenario.id);
    },
    async getScenarioByID(id) {
      const scenarioMethods = new ScenarioMethods();

      try {
        const response = await scenarioMethods.getScenarioByID(id);
        this.localScenario = response.data;
      } catch (error) {
        console.error("Error while getting scenarios: ", error);
        alert("Что-то пошло не так...")
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
  border-top: 1px solid #e8edf1;
  border-right: 1px solid #e8edf1;
  border-bottom: 1px solid #e8edf1;
  background-color: #FFFFFF;
  border-bottom-right-radius: 20px;
  border-top-right-radius: 20px;

  padding: 25px 10px 10px 40px;
}

.scenario-viewer__header {
  border-bottom: 1px solid #e8edf1;
  padding-bottom: 25px;
  padding-left: 10px;

  display: flex;
  gap: 20px;

  h3 {
    font-weight: normal;
    font-family: "JetBrains Mono", sans-serif;
    color: #000000;
  }

  #id {
    color: gray;
  }
}
</style>