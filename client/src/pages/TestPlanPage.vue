<template>
  <ProfilePreview/>
  <section class="test-plans-page container">
    <Sidebar/>

    <TestPlanList
      :projectID="projectId"
    />
  </section>
</template>

<script>
import Sidebar from "@/components/Sidebar.vue";
import TestPlanList from "@/components/TestPlan/TestPlanList.vue";
import ProfilePreview from "@/components/Profile/ProfilePreview.vue";

export default {
  components: {ProfilePreview, TestPlanList, Sidebar},
  computed: {
    projectId() {
      return this.$route.params.id
    }
  }
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