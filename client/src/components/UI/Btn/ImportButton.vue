<template>
  <button class="import-btn">
    <ImportIcon/>
  </button>
</template>

<script>
import ImportIcon from "@/components/UI/Icons/ImportIcon.vue";

export default {
  components: {ImportIcon}

}
</script>

<style scoped>
.import-btn {
  background: none;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  padding: 2px;
  align-items: center;
}

.import-btn:hover {
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}
</style>