<template>
  <section class="project-page container">
    <!-- CREATING PROJECT -->
    <ScenariosPage
      :projectID="projectId"
    />
  </section>
</template>

<script>
import ScenariosPage from "@/pages/ScenariosPage.vue";

export default {
  components: {ScenariosPage},
  computed: {
    projectId() {
      return this.$route.params.id
    }
  }
}
</script>

<style scoped>
.project-page {

}

@media (max-width: 1440px) {
  .project-page {
    padding: 20px;
    flex-direction: column;
  }
}
</style>