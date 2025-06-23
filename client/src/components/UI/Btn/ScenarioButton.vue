<template>
  <button class="scenario-btn">
    <ScenarioIcon/>
  </button>
</template>

<script>
import ScenarioIcon from "@/components/UI/Icons/ScenarioIcon.vue";

export default {
  components: {ScenarioIcon}

}
</script>

<style scoped>
.scenario-btn {
  background: none;
  border: none;
  cursor: pointer;
}
</style>