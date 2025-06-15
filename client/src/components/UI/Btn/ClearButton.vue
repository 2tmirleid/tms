<template>
  <button class="clear-btn">
    <ClearIcon/>
  </button>
</template>

<script>
import ClearIcon from "@/components/UI/Icons/ClearIcon.vue";

export default {
  components: {ClearIcon}

}
</script>

<style scoped>
.clear-btn {
  background: none;
  border: none;
  cursor: pointer;
}
</style>