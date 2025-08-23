<template>
  <section class="test-plans-page container">
    <Sidebar/>

    <TestPlanList/>
  </section>
</template>

<script>
import Sidebar from "@/components/Sidebar.vue";
import TestPlanList from "@/components/TestPlan/TestPlanList.vue";

export default {
  components: {TestPlanList, Sidebar}

}
</script>

<style scoped>
.test-plans-page {
  max-width: 100%;
  padding-top: 48px;
  padding-right: 10px;
  padding-bottom: 10px;
  background-color: #f9fbfb;
  display: flex;
}
</style>