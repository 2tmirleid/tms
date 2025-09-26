<template>
  <ProfilePreview v-if="auth.isAuth" class="profile-absolute"/>
  <section class="main-page container">
    <template v-if="auth.isAuth">
      <ProjectList/>
    </template>

    <AuthFormModal v-else/>
  </section>
</template>

<script>
import ProjectList from "@/components/Project/ProjectList.vue";
import AuthFormModal from "@/components/Auth/AuthFormModal.vue";
import {useAuthStore} from "@/stores/auth";
import ProfilePreview from "@/components/Profile/ProfilePreview.vue";

export default {
  components: {ProfilePreview, AuthFormModal, ProjectList },
  setup() {
    const auth = useAuthStore();
    auth.loadUserFromToken();
    return { auth };
  },
};
</script>


<style scoped>
.main-page {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin-top: 20px;
  height: calc(100vh - 60px);
  width: 99%;
  border: 1px solid var(--border-color);
  background-color: #FFFFFF;
  border-radius: 20px;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.05);
  font-family: var(--font-primary);
}

.profile-absolute {
  position: absolute;
  right: 0;
  padding: 8px;
}
</style>