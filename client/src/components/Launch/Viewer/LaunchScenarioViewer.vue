<template>
  <section class="launch-scenario-viewer">
    <LaunchScenarioViewerHeader
        :scenario="scenario"
        :launchResult="localLaunchResult"
        @result-updated="handleResultUpdated"
    />

    <LaunchScenarioViewerSidebar
        :scenario="scenario"
    />

    <div class="launch-scenario-viewer__content">
      <ScenarioField
          label="Описание"
          :value="scenario.description"
      />

      <ScenarioField
          label="Предусловие"
          :value="scenario.precondition"
      />

      <div class="scenario">
        <div class="content">
          <LaunchScenarioRunner
              :key="scenario.id"
              :scenario="scenario"
              :scenarioSteps="steps"
              :launchResult="localLaunchResult"
              @step-updated="handleResultUpdated"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import {LaunchResultMethods} from "@/api/launchResultMethods.js";
import LaunchScenarioViewerHeader from "@/components/Launch/Viewer/LaunchScenarioViewerHeader.vue";
import LaunchScenarioViewerSidebar from "@/components/Launch/Viewer/LaunchScenarioViewerSidebar.vue";
import ScenarioField from "@/components/Launch/Viewer/ScenarioField.vue";
import LaunchScenarioRunner from "@/components/Launch/Viewer/Runner/LaunchScenarioRunner.vue";
import {LaunchStepResultMethods} from "@/api/launchStepResultMethods.js";

export default {
  components: {LaunchScenarioRunner, ScenarioField, LaunchScenarioViewerSidebar, LaunchScenarioViewerHeader},
  inject: ['showAlert'],
  data() {
    return {
      launchResultMethods: new LaunchResultMethods(),
      launchStepResultMethods: new LaunchStepResultMethods(),
      localLaunchResult: {...this.launchResult},
      result: {},
      steps: [],
    }
  },
  props: {
    scenario: {
      type: Object,
      required: true
    },
    launchResult: {
      type: Object,
      required: true,
    },
  },
  methods: {
    async handleResultUpdated(resultID) {
      await this.refreshResult(resultID);

      this.$emit('result-updated', resultID);
    },
    async refreshResult(resultID) {
      try {
        const launchResponse = await this.launchResultMethods.getResult(resultID);
        this.localLaunchResult = launchResponse.data;

        const stepResponse = await this.launchStepResultMethods.getSteps(resultID);
        this.steps = stepResponse.data.sort((a, b) => a.id - b.id);
      } catch (error) {
        this.showAlert('Что-то пошло не так...');
        console.error(`Error while fetching scenario: ${error.message}`);
      }
    }
  },
  mounted() {
    this.refreshResult(this.launchResult.id);
  },
  watch: {
    launchResult: {
      immediate: true,
      handler(newVal) {
        this.localLaunchResult = {...newVal};
      }
    },
    scenario: {
      immediate: true,
      handler(newScenario) {
        this.steps = [];
        if (newScenario.id && this.localLaunchResult.id) {
          this.refreshResult(this.localLaunchResult.id);
        }
      }
    }
  },
}
</script>

<style scoped>
.launch-scenario-viewer {
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