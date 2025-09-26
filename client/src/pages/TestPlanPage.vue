<template>
  <Header/>
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
import Header from "@/components/Header/Header.vue";

export default {
  components: {Header, ProfilePreview, TestPlanList, Sidebar},
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
  padding-right: 10px;
  padding-bottom: 10px;
  background-color: #f9fbfb;
  display: flex;
}
</style>