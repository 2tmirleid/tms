<template>
  <section class="project-list">
    <h1>Проекты</h1>

    <ul class="projects">
      <li
          class="project"
          v-for="project in projects"
          :key="project.id"
      >
        <router-link :to="`/project/${project.id}`">
          <div class="content">
            <span id="title">{{ getTrimmed(project.title) }}</span>
            <span id="description">{{ getTrimmed(project.description) }}</span>
          </div>

          <div class="info">
            <div class="scenarios  info-item">
              <ScenarioIcon/>
              <span id="scenarios">{{ project.scenarios.length }}</span>
            </div>

            <div class="launches info-item">
              <LaunchIcon/>
              <span id="launches">{{ project.launches.length }}</span>
            </div>
          </div>
        </router-link>
      </li>
    </ul>

    <ProjectCreator
        @click.stop="creatingProject = true"
    />

    <div class="overlay" v-if="creatingProject"></div>

    <CreateProjectModal
        v-if="creatingProject"
        @close-modal="creatingProject = false"
        @create-project="createProject"
    />
  </section>
</template>

<script>
import {ProjectMethods} from "@/api/projectMethods.js";
import ScenarioIcon from "@/components/UI/Icons/ScenarioIcon.vue";
import LaunchIcon from "@/components/UI/Icons/LaunchIcon.vue";
import ProjectCreator from "@/components/Project/ProjectCreator.vue";
import CreateProjectModal from "@/components/Project/CreateProjectModal.vue";

export default {
  components: {CreateProjectModal, ProjectCreator, LaunchIcon, ScenarioIcon},
  inject: ['showAlert'],
  data() {
    return {
      projectMethods: new ProjectMethods(),
      projects: [],
      maxLength: 200,
      creatingProject: false
    }
  },
  methods: {
    async refreshProjects() {
      try {
        const response = await this.projectMethods.getProjects();
        this.projects = response.data.sort((a, b) => a.id - b.id);
      } catch (e) {
        this.showAlert('При попытке получить список проектов, что-то пошло не так...');
        console.error(`Error while fetching project's list: ${e.message}`);
      }
    },
    async createProject(project) {
      try {
        await this.projectMethods.createProject(project);
        this.creatingProject = false;

        await this.refreshProjects();
      } catch (e) {
        this.showAlert('При попытке создать проект, что-то пошло не так...');
        console.error(`Error while creating project: ${e.message}`);
      }
    },
    getTrimmed(val) {
      const max = this.maxLength;
      if (!val || typeof val !== 'string') return '';
      return val.length > max ? val.slice(0, max) + '...' : val;
    },
  },
  mounted() {
    this.refreshProjects()
  }
}
</script>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(4px);
  z-index: 5;
}

.project-list {
  margin: 40px auto;
  padding: 20px;
  max-width: 1400px;
  width: 90%;
  border: 1px solid var(--border-color);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  background: #fff;
}

.project-list h1 {
  padding: 10px 0 20px;
  font-size: 24px;
  text-align: center;
}

.projects {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.project {
  border: 1px solid var(--border-color);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
  padding: 15px;
  border-radius: 8px;
  cursor: pointer;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #fff;
}

.project:hover {
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.project a {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  text-decoration: none;
  color: #000;
}

.content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 10px;
}

#description {
  font-size: 14px;
  color: #555;
}

.info {
  margin-top: auto;
  border-top: 1px solid var(--border-color);
  padding-top: 8px;

  display: flex;
  justify-content: flex-start;
  gap: 15px;
}

.info .info-item {
  display: flex;
  align-items: center;
  gap: 4px;
}

.info svg {
  width: 18px;
}

/* 📱 Адаптив */
@media (max-width: 1200px) {
  .project-list {
    width: 95%;
    padding: 15px;
  }

  .projects {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 15px;
  }
}

@media (max-width: 768px) {
  .project-list {
    margin: 20px auto;
    padding: 10px;
  }

  .projects {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .project {
    min-height: auto;
  }
}

</style>