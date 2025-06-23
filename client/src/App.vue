<template>
  <main class="app-container">
    <router-view></router-view>
  </main>
</template>

<script>
export default {

}
</script>

<style scoped>
.container {
  max-width: 100%;
  padding: 48px 10px 10px 200px;
  background-color: #f9fbfb;
  display: flex;
}

@media (max-width: 1440px) {
  .container {
    padding: 20px;
    flex-direction: column;
  }
}
</style>