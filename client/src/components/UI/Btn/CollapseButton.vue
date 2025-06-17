<template>
  <button class="collapse-btn">
    <CollapseIcon/>
  </button>
</template>

<script>
import CollapseIcon from "@/components/UI/Icons/CollapseIcon.vue";

export default {
  components: {CollapseIcon}

}
</script>

<style scoped>
.collapse-btn {
  background: none;
  border: none;
  cursor: pointer;
}
</style>