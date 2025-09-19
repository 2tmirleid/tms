<template>
  <div class="auth-btn">
    <div class="auth">
      <button @click="this.$emit('submit')">
        {{ authType === 'register' ? 'Sign Up' : 'Sign In' }}
      </button>
    </div>

    <div class="change-type">
      <button @click="this.$emit('change-type')">
        {{ authType === 'register' ? 'Войти в аккаунт' : 'Регистрация' }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    authType: String
  },
  data() {

  }
}
</script>

<style scoped>
.auth-btn {
  display: flex;
  margin: 0 auto;
  justify-content: center;
  position: relative;
  width: 100%;
}

button {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 5px 10px;
  font-family: var(--font-primary);
  font-size: 15px;
  background: #FFFFFF;
  border: 1px solid var(--border-color);
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}

button:hover {
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.change-type {
  position: absolute;
  left: 0;
  text-decoration: underline;
}
</style>