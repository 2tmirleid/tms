<template>
  <div class="launch-scenario-viewer-header">
    <div class="title__wrapper">
      <h3 id="id">#{{ scenario.id }}</h3>

      <LaunchScenarioStatusContextMenu
          :status="localLaunchResult.status"
          :scenarioID="scenario.id"
          :launchResultID="localLaunchResult.id"
          @result-updated="handleResultUpdated"
      />

      <h3 id="title">{{ scenario.title }}</h3>
    </div>
  </div>
</template>

<script>
import LaunchScenarioStatusContextMenu from "@/components/Launch/Viewer/LaunchScenarioStatusContextMenu.vue";

export default {
  components: {LaunchScenarioStatusContextMenu},
  props: {
    scenario: {
      type: Object,
      required: true
    },
    launchResult: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
      localLaunchResult: {...this.launchResult}
    }
  },
  methods: {
    handleResultUpdated(launchResultID) {
      this.$emit('result-updated', launchResultID);
    }
  },
  watch: {
    launchResult: {
      immediate: true,
      deep: true,
      handler(newVal) {
        if (newVal) {
          this.localLaunchResult = {...newVal};
        }
      }
    }
  },
}
</script>

<style scoped>
.launch-scenario-viewer-header {
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