<template>
  <button class="stat-btn">
    <StatIcon/>
  </button>
</template>

<script>
import StatIcon from "@/components/UI/Icons/StatIcon.vue";

export default {
  components: {StatIcon}

}
</script>

<style scoped>
.stat-btn {
  background: none;
  cursor: pointer;
  border: 2px solid var(--border-color);
  border-radius: 5px;
  padding: 3px;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.05);
  margin-bottom: 3px;
  transition: ease 0.3s;
}

.stat-btn:hover {
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}
</style>