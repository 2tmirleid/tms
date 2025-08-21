<template>
  <section class="launch-list">
    <LaunchListHeader/>
    <ul
        class="launches"
    >
      <li
          class="launch"
          v-for="launch in launches"
          :key="launch.id"
      >
        <div class="launch__header">
          <span class="id">#{{ launch.id }}</span>

          <LaunchStatusContextMenu
              :status="launch.status"
              :launchID="launch.id"
              :activeLaunchId="activeLaunchId"
              @open="activeLaunchId = launch.id"
              @close="activeLaunchId = null"
              @launch-updated="refreshLaunches"
          />

          <span
              class="title"
              @click.stop="this.$emit('launch-selected', launch)"
          >
            {{ launch.title }}</span>
        </div>

        <div class="launch__content">
          <span class="launch__description">{{ launch.description }}</span>

          <div class="launch__status status-list">
            <span
                v-for="(count, statusId) in launch.resultsSummary"
                :key="statusId"
                class="status-circle"
                :style="{ backgroundColor: launch.colorsMap[statusId] }"
            >
              {{ count }}
            </span>
          </div>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
import {LaunchMethods} from "@/api/launchMethods.js";
import {LaunchResultMethods} from "@/api/launchResultMethods.js";
import LaunchListHeader from "@/components/Launch/LaunchListHeader.vue";
import LaunchStatusContextMenu from "@/components/Launch/LaunchStatusContextMenu.vue";

export default {
  components: {LaunchStatusContextMenu, LaunchListHeader},
  inject: ['showAlert'],
  data() {
    return {
      launchMethods: new LaunchMethods(),
      launchResultMethods: new LaunchResultMethods(),
      launches: [],
      activeLaunchId: null,
    }
  },
  methods: {
    async refreshLaunches() {
      try {
        const launchResponse = await this.launchMethods.getLaunches();
        this.launches = launchResponse.data.sort((a, b) => a.id - b.id);

        // КОСТЫЛЬ
        const allStatuses = {
          1: { title: 'В процессе', color: '#e1e8ed' },
          2: { title: 'Пройден', color: '#28a745' },
          3: { title: 'Не пройден', color: '#c00000' }
        };

        for (const launch of this.launches) {
          const resultResponse = await this.launchResultMethods.getResults(launch.id);
          const results = resultResponse.data;

          const summary = {};
          const statusesMap = {};
          const colorsMap = {};

          // Инициализируем все статусы с нулевыми значениями
          Object.keys(allStatuses).forEach(statusId => {
            summary[statusId] = 0;
            statusesMap[statusId] = allStatuses[statusId].title;
            colorsMap[statusId] = allStatuses[statusId].color;
          });

          // Заполняем реальными данными
          results.forEach(r => {
            const id = r.status.id;
            summary[id] = (summary[id] || 0) + 1;
            statusesMap[id] = r.status.title;
            colorsMap[id] = r.status.color;
          });

          launch.resultsSummary = summary;
          launch.statusesMap = statusesMap;
          launch.colorsMap = colorsMap;
        }
      } catch (error) {
        this.showAlert('Что-то пошло не так...');
        console.error(`Error while fetching launches list: ${error.message}`);
      }
    }
  },
  mounted() {
    this.refreshLaunches();
  }
}
</script>

<style scoped>
.launch-list {
  height: calc(100vh - 60px);
  width: 100%;
  border: 1px solid var(--border-color);
  background-color: #FFFFFF;
  border-radius: 20px;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.05);
  font-family: var(--font-primary);
}

.status-list {
  display: flex;
  gap: 6px;
}

.status-circle {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  color: #fff;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.launches {
  margin-top: 15px;
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 15px;
}

.launch {
  border: 2px solid var(--border-color);
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.3s ease;
  width: 98%;
  border-radius: 15px;
  padding: 10px;
  cursor: pointer;
}

.launch:hover {
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.launch__header {
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 10px;
  display: flex;
  gap: 15px;
  align-items: center;
}

.launch__header .id {
  color: var(--id-color);
}

.launch__content {
  display: flex;
  justify-content: space-between;
  padding-top: 10px;
}

.launch__content .launch__description {
  color: var(--id-color);
}
</style>
