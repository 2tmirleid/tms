<template>
  <div class="launch-list-header">
    <div class="search-container">
      <div class="search-input-wrapper">
        <input
            type="text"
            placeholder="Поиск"
            v-model="launch"
            @keyup.enter="findLaunch"
            class="search-input"
        >
        <ClearButton
            v-if="launch.length > 0"
            class="clear-button"
            @click="clearSearch"
        />
      </div>

      <div class="options">
        <div class="data">
        </div>

        <div class="sort">
          <LaunchSortContextMenu
              @launch-sorted="handleSort"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ClearButton from "@/components/UI/Btn/ClearButton.vue";
import {LaunchMethods} from "@/api/launchMethods.js";
import LaunchSortContextMenu from "@/components/Launch/LaunchSortContextMenu.vue";

export default {
  inject: ['showAlert'],
  components: {LaunchSortContextMenu, ClearButton},
  data() {
    return {
      launchMethods: new LaunchMethods(),
      launch: ''
    }
  },
  methods: {
    async handleSort(type) {
      this.$emit('launch-sorted', type);
    },
    async findLaunch() {
      const query = this.launch.trim();

      if (!query) {
        this.$emit("refresh-launch-list");
        return;
      }

      try {
        const criteria = {};

        query.split(";").forEach(pair => {
          const [propRaw, valuesRaw] = pair.split("=");
          if (!propRaw || !valuesRaw) return;

          const property = propRaw.trim().toLowerCase();
          const values = valuesRaw
              .split(",")
              .map(val => val.trim())
              .filter(Boolean);

          if (values.length) {
            criteria[property] = values;
          }
        });

        const response = await this.launchMethods.searchLaunch(criteria);

        if (!response || response.length === 0) {
          this.showAlert("Запуск не был найден");
          this.$emit("refresh-launch-list");
          return;
        }

        this.$emit("found-launch", response);
      } catch (error) {
        const status = error?.response?.status;

        if (status === 400 || status === 404) {
          this.showAlert("Запуск не был найден");
          this.$emit("refresh-launch-list");
        } else {
          console.error("Ошибка поиска:", error);
          this.showAlert("Ошибка при поиске запуска");
        }
      }
    },
    async clearSearch() {
      this.launch = '';
      this.$emit("refresh-launch-list");
    }
  }
}
</script>

<style scoped>
.options {
  padding: 5px;
  float: right;
  display: flex;
  gap: 10px;
}

.launch-list-header {
  height: 150px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
}

.search-container {
  width: 100%;
  max-width: 800px;
  position: relative;
}

.search-input-wrapper {
  width: 100%;
  position: relative;
}

.search-input {
  width: 100%;
  padding: 10px 40px 10px 15px;
  outline: none;
  border: 1px solid var(--border-color);
  border-radius: 10px;
  font-family: var(--font-primary);
  font-size: 15px;
  box-sizing: border-box;
}

.clear-button {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>