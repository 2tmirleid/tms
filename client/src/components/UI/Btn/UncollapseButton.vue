<template>
  <button class="uncollapse-btn">
    <UncollapseIcon/>
  </button>
</template>

<script>
import UncollapseIcon from "@/components/UI/Icons/UncollapseIcon.vue";

export default {
  components: {UncollapseIcon}

}
</script>

<style scoped>
.uncollapse-btn {
  background: none;
  border: none;
  cursor: pointer;
}
</style>