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
    </div>
  </div>
</template>

<script>
import {ScenarioMethods} from "@/api/scenarioMethods.js";
import ClearButton from "@/components/UI/Btn/ClearButton.vue";

export default {
  components: {ClearButton},
  data() {
    return {
      scenarioMethods: new ScenarioMethods(),
      scenario: ''
    }
  },
  methods: {
    async findScenario() {
      try {
        const scenario = await this.scenarioMethods.getScenarioByID(this.scenario);
        this.$emit("found-scenario", scenario);
      } catch(error) {
        if (error.response.status === 400) {
          alert("Сценарий не был найден");
        } if (error.response.status === 404) {
          this.$emit("refresh-scenarios-list");
        } else {
          console.error("Error while finding scenario: " + error);
          alert("Что-то пошло не так...");
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
.scenario-list__header {
  --border-color: #e8edf1;
  --font-primary: "JetBrains Mono", monospace, sans-serif;

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