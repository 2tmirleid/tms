<template>
  <div class="auth-form-modal">
    <div class="title">
      <h2>{{ authType === 'register' ? 'Sign Up' : 'Sign In' }}</h2>
    </div>

    <div class="fields">
      <div class="email field">
        <h4>Почта</h4>

        <input
            type="email"
            v-model="auth.email"
            required>
      </div>

      <div class="password field">
        <h4>Пароль</h4>

        <input
            type="password"
            v-model="auth.password"
        >
      </div>
    </div>

    <AuthButton
      :authType="authType"
      @change-type="toggleAuthType"
      @submit="submit"
    />
  </div>
</template>

<script>
import AuthButton from "@/components/Auth/AuthButton.vue";
import {AuthMethods} from "@/api/authMethods.js";
import {useAuthStore} from "@/stores/auth.js";

export default {
  components: {AuthButton},
  inject: ['showAlert'],
  data() {
    return {
      auth: {
        email: '',
        password: ''
      },
      authType: 'register',
      authRegexp: /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/i,
      authMethods: new AuthMethods(),
    }
  },
  methods: {
    toggleAuthType() {
      this.authType = this.authType === 'register' ? 'login' : 'register'
    },
    async submit() {
      if (!this.auth.email || !this.auth.password) {
        this.showAlert('Почта и пароль не могут быть пустыми');
        return;
      }

      if (!this.authRegexp.test(this.auth.email)) {
        this.showAlert('Введите корректную почту');
        return;
      }

      const storage = useAuthStore();

      if (this.authType === 'register') {
        try {
          const response = await this.authMethods.register(this.auth);

          storage.login(response.data.token);
        } catch(e) {
          if (e.response && e.response.status === 400) {
            if (e.response.data.message === 'User already exists') {
              this.showAlert('Пользователь с такой почтой уже существует');
              return;
            }
          } else {
            this.showAlert('Что-то пошло не так...');
            console.error(`Error while register: ${e.message}`);
          }
        }
      } else {
        try {
          const response = await this.authMethods.login(this.auth);

          storage.login(response.data.token);
        } catch (e) {
          if (e.response && e.response.status === 401) {
            if (e.response.data.message === 'Uncorrected email or password') {
              this.showAlert('Некорректные почта или пароль');
              return;
            }
          } else {
            this.showAlert('Что-то пошло не так...');
            console.error(`Error while register: ${e.message}`);
          }
        }
      }
    }
  }
}
</script>

<style scoped>
.auth-form-modal {
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  width: 30%;
  height: 60%;
  border: 1px solid var(--border-color);
  background-color: #FFFFFF;
  border-radius: 20px;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.05);
  z-index: 998;

  display: flex;
  flex-direction: column;
  padding: 20px;
}

.fields {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.auth-btn {
  margin-top: auto;
}

.field input {
  padding: 5px;
  margin-top: 10px;
  width: 95%;
  height: 15px;
  border-radius: 5px;
  border: 2px solid var(--border-color);
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.05);
  outline: none;
  font-family: var(--font-primary);
}

.title {
  text-align: center;
  padding: 15px;
}
</style>