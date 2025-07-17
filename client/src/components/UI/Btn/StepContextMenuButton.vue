<template>
  <button class="context-menu-btn">
    <StepContextMenuIcon/>
  </button>
</template>

<script>
import StepContextMenuIcon from "@/components/UI/Icons/StepContextMenuIcon.vue";

export default {
  components: {StepContextMenuIcon}

}
</script>

<style scoped>
.context-menu-btn {
  padding-top: 2px;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 1;
}

.context-menu-btn:hover {
  background-color: #FFFFFF;
  border-radius: 5px;
}
</style>