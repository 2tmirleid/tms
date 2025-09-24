<template>
  <Header/>
  <section class="launch-page container">
    <Sidebar/>

    <!-- список -->
    <LaunchList
        v-if="!$route.params.launchID"
        @launch-selected="handleLaunchSelected"
        :projectID="projectId"
    />

    <!-- сценарии -->
    <router-view
        v-else
        ref="scenarioList"
        @scenario-selected="handleScenarioSelected"
    />

    <!-- просмотр сценария -->
    <LaunchScenarioViewer
        :key="viewedScenario?.id"
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
import ProfilePreview from "@/components/Profile/ProfilePreview.vue";
import Header from "@/components/Header/Header.vue";

export default {
  components: {Header, ProfilePreview, LaunchScenarioViewer, LaunchScenarioList, LaunchList, Sidebar},
  data() {
    return {
      viewScenario: false,
      viewedScenario: null,
      launchResult: {},
    }
  },
  methods: {
    handleLaunchSelected(launch) {
      this.$router.push({
        path: `/project/${this.projectId}/launches/${launch.id}`
      })
    },
    handleScenarioSelected(array) {
      this.viewScenario = true;
      this.viewedScenario = array[0];
      this.launchResult = array[1];
    },
    handleResultUpdated(resultID) {
      this.$refs.scenarioList.refreshScenarios();
    }
  },
  computed: {
    projectId() {
      return this.$route.params.id
    }
  }
}
</script>

<style scoped>
.launch-page {
  max-width: 100%;
  padding-right: 10px;
  padding-bottom: 10px;
  background-color: #f9fbfb;
  display: flex;
}
</style>