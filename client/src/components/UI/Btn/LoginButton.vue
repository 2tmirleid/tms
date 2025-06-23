<template>
  <button class="login-btn">
    <LoginIcon/>
  </button>
</template>

<script>
import LoginIcon from "@/components/UI/Icons/LoginIcon.vue";

export default {
  components: {LoginIcon}

}
</script>

<style scoped>
.login-btn {
  cursor: pointer;
  background: none;
  border: none;
}
</style>