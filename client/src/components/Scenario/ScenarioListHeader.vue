<template>
  <div class="scenario-list__header">
    <div class="search-container">
      <div class="search-input-wrapper">
        <input
            type="text"
            placeholder="Поиск"
            v-model="scenario"
            @keyup.enter="findScenario"
            class="search-input"
        >
        <ClearButton
            v-if="scenario.length > 0"
            class="clear-button"
            @click="clearSearch"
        />
      </div>

      <div class="options">
        <div class="data">
          <div class="import">
            <ImportScenarioMenu
              @refresh-scenarios-list="$emit('refresh-scenarios-list')"
            />
          </div>
        </div>

        <div class="sort">
          <SortContextMenu
            @scenario-sorted="handleSort"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {ScenarioMethods} from "@/api/scenarioMethods.js";
import ClearButton from "@/components/UI/Btn/ClearButton.vue";
import SortButton from "@/components/UI/Btn/SortButton.vue";
import SortContextMenu from "@/components/Scenario/SortContextMenu.vue";
import ImportScenarioMenu from "@/components/Scenario/ImportScenarioMenu.vue";

export default {
  inject: ["showAlert"],
  components: {ImportScenarioMenu, SortContextMenu, SortButton, ClearButton},
  data() {
    return {
      scenarioMethods: new ScenarioMethods(),
      scenario: ''
    }
  },
  methods: {
    async handleSort(type) {
      this.$emit('scenario-sorted', type);
    },
    async findScenario() {
      const query = this.scenario.trim();

      if (!query) {
        this.$emit("refresh-scenarios-list");
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

        const response = await this.scenarioMethods.searchScenario(criteria);

        if (!response || response.length === 0) {
          this.showAlert("Сценарий не был найден");
          this.$emit("refresh-scenarios-list");
          return;
        }

        this.$emit("found-scenario", response);
      } catch (error) {
        const status = error?.response?.status;

        if (status === 400 || status === 404) {
          this.showAlert("Сценарий не был найден");
          this.$emit("refresh-scenarios-list");
        } else {
          console.error("Ошибка поиска:", error);
          this.showAlert("Ошибка при поиске сценария");
        }
      }
    },
    async clearSearch() {
      this.scenario = '';
      this.$emit("refresh-scenarios-list");
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

.scenario-list__header {
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