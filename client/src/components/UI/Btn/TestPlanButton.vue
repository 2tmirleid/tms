<template>
  <button class="test-plan-btn">
    <TestPlanIcon/>
  </button>
</template>

<script>

import TestPlanIcon from "@/components/UI/Icons/TestPlanIcon.vue";

export default {
  components: {TestPlanIcon}

}
</script>

<style scoped>
.test-plan-btn {
  background: none;
  border: none;
  cursor: pointer;
}
</style>