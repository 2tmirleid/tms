<template>
  <button class="sort-btn">
    <SortIcon/>
  </button>
</template>

<script>
import SortIcon from "@/components/UI/Icons/SortIcon.vue";

export default {
  components: {SortIcon}

}
</script>

<style scoped>
.sort-btn {
  background: none;
  border: none;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  padding: 2px;
  align-items: center;
  cursor: pointer;
}

.sort-btn:hover {
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}
</style>