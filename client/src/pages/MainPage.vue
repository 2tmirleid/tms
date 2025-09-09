<template>
  <section class="main-page container">
    <ProjectList/>
  </section>
</template>

<script>


import ProjectList from "@/components/Project/ProjectList.vue";

export default {
  components: {ProjectList}
}
</script>

<style scoped>
.main-page {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin-top: 20px;
  height: calc(100vh - 60px);
  width: 99%;
  border: 1px solid var(--border-color);
  background-color: #FFFFFF;
  border-radius: 20px;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.05);
  font-family: var(--font-primary);
}
</style>