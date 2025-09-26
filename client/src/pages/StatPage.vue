<template>
  <section class="stat-page container">
    <StatList
      :launchID="launchId"
    />
  </section>
</template>

<script>
import Header from "@/components/Header/Header.vue";
import StatList from "@/components/Launch/Stat/StatList.vue";

export default {
  components: {StatList, Header},
  data() {
    return {

    }
  },
  methods: {

  },
  computed: {
    projectId() {
      return this.$route.params.id
    },
    launchId() {
      return this.$route.params.launchID
    }
  }
}
</script>

<style scoped>
.stat-page {
  overflow-y: hidden;
  width: 100%;
  max-width: 100%;
  padding-right: 10px;
  padding-bottom: 10px;
  background-color: #f9fbfb;
  display: flex;
}
</style>