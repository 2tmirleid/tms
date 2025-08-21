<template>
  <button class="launch-btn">
    <LaunchIcon/>
  </button>
</template>

<script>

import LaunchIcon from "@/components/UI/Icons/LaunchIcon.vue";

export default {
  components: {LaunchIcon}

}
</script>

<style scoped>
.launch-btn {
  background: none;
  border: none;
  cursor: pointer;
}
</style>