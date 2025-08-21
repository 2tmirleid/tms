<template>
  <section class="launch-page container">
    <Sidebar/>

    <LaunchList
        v-if="!viewLaunch"
        @launch-selected="handleLaunchSelected"
    />

    <LaunchScenarioList
        ref="scenarioList"
        v-if="viewLaunch && viewedLaunchID !== null"
        :launchID="viewedLaunchID"
        @scenario-selected="handleScenarioSelected"
    />

    <LaunchScenarioViewer
        :key="viewedScenario.id"
        v-if="viewScenario && viewedScenario !== null"
        :scenario="viewedScenario"
        :launchResult="launchResult"
        @result-updated="handleResultUpdated"
    />
  </section>
</template>

<script>
import Sidebar from "@/components/Sidebar.vue";
import LaunchList from "@/components/Launch/LaunchList.vue";
import LaunchScenarioList from "@/components/Launch/Viewer/LaunchScenarioList.vue";
import LaunchScenarioViewer from "@/components/Launch/Viewer/LaunchScenarioViewer.vue";

export default {
  components: {LaunchScenarioViewer, LaunchScenarioList, LaunchList, Sidebar},
  data() {
    return {
      viewLaunch: false,
      viewedLaunchID: null,
      viewScenario: false,
      viewedScenario: null,
      launchResult: {},
    }
  },
  methods: {
    handleLaunchSelected(launch) {
      this.viewLaunch = true;
      this.viewedLaunchID = launch.id;
    },
    handleScenarioSelected(array) {
      this.viewScenario = true;
      this.viewedScenario = array[0];
      this.launchResult = array[1];
    },
    handleResultUpdated(resultID) {
      this.$refs.scenarioList.refreshScenarios();
    }
  }
}
</script>

<style scoped>
.launch-page {
  max-width: 100%;
  padding-top: 48px;
  padding-right: 10px;
  padding-bottom: 10px;
  background-color: #f9fbfb;
  display: flex;
}
</style>