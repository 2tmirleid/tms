<template>
  <section class="scenario-list" :style="{
    width: `${this.width}%`,
    minWidth: `${this.minWidth}%`,
    maxWidth: `${this.maxWidth}%`,
  }">
    <ScenarioListHeader
        @refresh-scenarios-list="refreshScenarios"
        @found-scenario="handleFoundScenario"
    />

    <ul class="scenarios">
      <transition-group
          name="scenario"
          tag="ul"
          class="scenarios"
          appear
      >
        <li
            v-for="scenario in scenarios"
            :key="scenario.id"
            class="scenario-preview"
            @click="$emit('select', scenario)"
            @dblclick="startEditTitle(scenario)"
        >
          <template v-if="editedTitleID !== scenario.id">
          <span class="title">
            <span class="id">#{{ scenario.id }}</span>
            <span class="status" :style="{backgroundColor: scenario.status.color}"></span>
            {{ getTrimmedTitle(scenario.title) }}
          </span>
          </template>

          <input
              v-else
              ref="titleInput"
              v-model="updatedScenarioTitle"
              class="new-scenario-title"
              :placeholder="scenario.title"
              @blur="cancelEdit"
              @keyup.enter="saveTitle(scenario.id)"
              @keyup.esc="cancelEdit"
          />
        </li>
      </transition-group>
    </ul>

    <ScenarioCreator @scenario-created="refreshScenarios"/>

    <div class="resizer" @mousedown="startResizing"></div>
  </section>
</template>

<script>
import {ScenarioMethods} from "@/api/scenarioMethods.js";
import ScenarioCreator from "@/components/Scenario/ScenarioCreator.vue";
import DeleteButton from "@/components/UI/Btn/DeleteButton.vue";
import ScenarioListHeader from "@/components/Scenario/ScenarioListHeader.vue";
import ContextMenuButton from "@/components/UI/Btn/ScenarioContextMenuButton.vue";
import ContextMenu from "@/components/Scenario/ScenarioContextMenu.vue";

export default {
  components: {ContextMenu, ContextMenuButton, ScenarioListHeader, DeleteButton, ScenarioCreator},
  inject: ['showAlert'],

  data: () => ({
    scenarios: [],
    editedTitleID: 0,
    deletingTitleID: 0,
    maxTitleLength: 120,
    updatedScenarioTitle: '',
    showDeleteIcon: false,
    scenarioMethods: new ScenarioMethods(),
    minWidth: 35,
    width: 40,
    maxWidth: 60,
    resizing: false,
    startWidth: 0,
    startX: 0,
  }),

  methods: {
    async refreshScenarios() {
      try {
        const response = await this.scenarioMethods.getScenariosList();
        this.scenarios = response.data.sort((a, b) => a.id - b.id);
      } catch (error) {
        console.error("Fetch scenarios error:" + error);
        this.showAlert('При попытке получить список сценариев что-то пошло не так...');
      }
    },
    async handleFoundScenario(scenario) {
      this.scenarios = Array.isArray(scenario.data) ? scenario.data : [scenario.data];
    },
    startEditTitle(scenario) {
      this.editedTitleID = scenario.id;
      this.updatedScenarioTitle = scenario.title;

      this.$nextTick(() => {
        if (this.$refs.titleInput?.length) {
          const input = this.$refs.titleInput[0];
          input.focus();
        }
      });
    },
    cancelEdit() {
      this.editedTitleID = 0;
      this.updatedScenarioTitle = '';
    },
    async saveTitle(id) {
      try {
        if (!this.updatedScenarioTitle.trim()) {
          this.showAlert('Название сценария не может быть пустым.');
          return;
        }

        const body = {"title": this.updatedScenarioTitle.trim() || this.scenarios.find(s => s.id === id).title}

        await this.scenarioMethods.updateScenario(id, body);

        await this.refreshScenarios();
        this.$emit('scenario-updated', id);
        this.cancelEdit();
      } catch (error) {
        console.error("Update title error:" + error);
        this.showAlert('При попытке изменить название что-то пошло не так...');
      }
    },
    getTrimmedTitle(title) {
      const max = this.maxTitleLength;
      if (!title || typeof title !== 'string') return '';
      return title.length > max ? title.slice(0, max) + '...' : title;
    },
    startResizing(event) {
      this.resizing = true;
      this.startWidth = this.width;
      this.startX = event.clientX;

      document.addEventListener('mousemove', this.resize);
      document.addEventListener('mouseup', this.cancelResizing);

      document.body.style.userSelect = 'none';
      document.body.style.cursor = 'col-resize';
    },

    resize(event) {
      if (!this.resizing) return;

      const offsetX = event.clientX - this.startX;
      const offsetPercent = (offsetX / window.innerWidth) * 100;

      let newWidth = this.startWidth + offsetPercent;

      if (newWidth < this.minWidth) newWidth = this.minWidth;
      if (newWidth > this.maxWidth) newWidth = this.maxWidth;

      this.width = newWidth;
    },

    cancelResizing() {
      this.resizing = false;

      document.removeEventListener('mousemove', this.resize);
      document.removeEventListener('mouseup', this.cancelResizing);

      document.body.style.removeProperty('user-select');
      document.body.style.removeProperty('cursor');
    }
  },

  mounted() {
    this.refreshScenarios();
  },
}
</script>

<style scoped>
.resizer {
  width: 4px;
  height: calc(100vh - 60px);
  background: none;
  cursor: col-resize;

  position: absolute;
  left: 100%;
}

.scenario-list {
  position: relative;

  height: calc(100vh - 60px);
  border: 1px solid var(--border-color);
  background-color: #FFFFFF;
  border-radius: 20px 0 0 20px;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.05);

  display: flex;
  flex-direction: column;
}

.scenarios {
  flex: 1;
  overflow-y: auto;
  padding: 18px;
  list-style: none;
}

.scenario-preview {
  display: flex;
  gap: 10px;
  font-family: var(--font-primary);
  font-size: 14px;
  padding: 5px;
  border-radius: 5px;
  transition: background-color 0.2s ease;
  cursor: pointer;
  align-items: center;
}

.scenario-preview .title {
  display: flex;
  align-items: center;
  gap: 6px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  flex: 1;
}

.scenario-preview .title .id {
  color: var(--id-color);
  flex-shrink: 0;
  min-width: 30px;
  text-align: right;
}

.scenario-preview:hover {
  background-color: var(--hover-bg);
}

.new-scenario-title {
  width: 100%;

  font-family: var(--font-primary);
  font-size: 14px;
  font-weight: normal;

  background: none;
  border: none;
  outline: none;
}

.scenario-preview .status {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  display: inline-block;
  vertical-align: middle;
  flex-shrink: 0;
}

/* Анимация появления */
.scenario-enter-active {
  transition: all 0.4s ease;
}
.scenario-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}
.scenario-enter-to {
  opacity: 1;
  transform: translateX(0);
}

/* Анимация удаления */
.scenario-leave-active {
  transition: all 0.4s ease;
  position: absolute;
}
.scenario-leave-from {
  opacity: 1;
  transform: translateX(0);
}
.scenario-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

</style>