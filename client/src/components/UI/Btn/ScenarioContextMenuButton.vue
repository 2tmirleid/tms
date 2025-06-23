<template>
  <button class="context-menu-btn">
    <ContextMenuIcon/>


  </button>
</template>

<script>
import ContextMenuIcon from "@/components/UI/Icons/ScenarioContextMenuIcon.vue";

export default {
  components: {ContextMenuIcon}

}
</script>

<style scoped>
.context-menu-btn {
  padding-top: 2px;
  background: none;
  border: none;
  cursor: pointer;
}
</style>