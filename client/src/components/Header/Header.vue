<template>
  <section class="header">
    <div class="left">
      <div class="logo">
        <router-link to="/">
          <LogoIcon/>
        </router-link>
      </div>

      <div class="project">
        <router-link to="/">
          <div class="project-logo">
            <span>{{ projectTitle.charAt(0).toUpperCase() }}</span>
          </div>

          <div class="project-title">
            <span>{{ projectTitle }}</span>
          </div>
        </router-link>
      </div>
    </div>

    <div class="right">
      <ProfilePreview/>
    </div>
  </section>
</template>

<script>
import ProfilePreview from "@/components/Profile/ProfilePreview.vue";
import LogoIcon from "@/components/UI/Icons/LogoIcon.vue";
import {ProjectMethods} from "@/api/projectMethods.js";

export default {
  components: {LogoIcon, ProfilePreview},
  data() {
    return {
      projectMethods: new ProjectMethods(),
      projectTitle: ''
    }
  },
  methods: {
    async getProject() {
      const projectID = this.$route.params.id;
      const response = await this.projectMethods.getProject(projectID);

      this.projectTitle = response.data.title;
    }
  },
  mounted() {
    this.getProject();
  }
}
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  padding: 8px;
  background-color: #f9fbfb;
}

.left {
  display: flex;
  gap: 15px;
}

.project > a {
  font-family: var(--font-primary);

  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  text-decoration: none;
  color: inherit;
}

.project-title {
  font-size: 14px;
}

.project-logo {
  width: 30px;
  height: 30px;
  border: 1px solid var(--border-color);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;
}

.logo {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 30px;
  height: 30px;

  border: 1px solid var(--border-color);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 50%;
}

.logo svg {
  display: block;
  width: 50%;
  height: 50%;
  margin: auto;
}
</style>