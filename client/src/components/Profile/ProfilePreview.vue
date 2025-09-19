<template>
  <div class="profile-preview">
    <div
        class="avatar"
        v-if="!fullView"
        @click="fullView = true"
    >
      <span v-if="userEmail">{{ userEmail.charAt(0).toUpperCase() }}</span>
    </div>

    <div
        class="full-view"
        v-else
        @click="fullView = false"
    >
      <div class="wrapper">
        <span v-if="userEmail">{{ userEmail }}</span>
        <LogoutIcon
          @click="logout"
        />
      </div>
    </div>
  </div>
</template>

<script>
import {parseToken} from "@/utils/parseToken.js";
import LogoutButton from "@/components/UI/Btn/LogoutButton.vue";
import LogoutIcon from "@/components/UI/Icons/LogoutIcon.vue";
import {useAuthStore} from "@/stores/auth.js";

export default {
  components: {LogoutIcon, LogoutButton},
  data() {
    return {
      userEmail: null,
      fullView: false,
      storage: useAuthStore(),
    }
  },
  methods: {
    logout() {
      this.storage.logout();
    }
  },
  mounted() {
    const token = localStorage.getItem('accessToken');
    if (token) {
      const payload = parseToken(token);
      if (payload) {
        this.userEmail = payload.email;
      }
    }
  }
}
</script>

<style scoped>
.profile-preview {
  position: absolute;
  right: 0;
  padding: 10px;
  font-family: var(--font-primary);
  cursor: pointer;
}

.avatar {
  width: 30px;
  height: 30px;
  border: 1px solid var(--border-color);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;
}

.full-view {
  width: 250px;
  height: 30px;
  border: 1px solid var(--border-color);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  display: flex;
  justify-content: start;
  padding-left: 5px;
  padding-right: 5px;
  align-items: center;
}

.wrapper {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.wrapper svg{
  width: 20px;
  height: 20px;
}
</style>