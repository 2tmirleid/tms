<template>
  <section class="stat-list">
    <PercentStat
        :launchID="launchID"
    />

    <FailedStat
        :launchID="launchID"
    />
  </section>
</template>

<script>
import PercentStat from "@/components/Launch/Stat/PercentStat.vue";
import FailedStat from "@/components/Launch/Stat/FailedStat.vue";

export default {
  components: {FailedStat, PercentStat},
  props: {
    launchID: String | Number
  },
}
</script>

<style scoped>
.stat-list {
  overflow-y: hidden;
  width: 100%;
  border: 1px solid var(--border-color);
  background-color: #FFFFFF;
  border-radius: 20px;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.05);
  font-family: var(--font-primary);

  display: flex;
}
</style>
