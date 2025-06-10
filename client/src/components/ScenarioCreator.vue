<template>
  <transition name="fade-slide">
    <button
        v-if="!isNewScenario"
        class="scenario-creator"
        @click="activateNewScenario"
        key="button"
    >
      <img src="@/public/addScenario.svg" alt="Добавить сценарий"/>
      Сценарий
    </button>
  </transition>

  <transition name="fade-slide">
    <input
        v-if="isNewScenario"
        ref="scenarioInput"
        class="new-scenario"
        v-model="newScenarioName"
        type="text"
        placeholder="Название сценария"
        @blur="isNewScenario = false"
        @keyup.enter="saveScenario"
        key="input"
    />
  </transition>
</template>

<script>
import {ScenarioMethods} from "@/api/scenarioMethods.js";

export default {
  data() {
    return {
      isNewScenario: false,
      newScenarioName: ''
    };
  },
  methods: {
    activateNewScenario() {
      this.isNewScenario = true;
      this.$nextTick(() => {
        this.$refs.scenarioInput.focus();
      });
    },
    async saveScenario() {
      try {
        const scenarioMethods = new ScenarioMethods();

        await scenarioMethods.createScenario(this.newScenarioName);

        this.$emit('scenario-created');

        this.newScenarioName = '';
        this.isNewScenario = false;
      } catch (e) {
        console.error("Error while creating scenario: ", e);
      }
    }
  },
};
</script>

<style scoped>
.new-scenario {
  width: 20%;

  padding: 5px 10px 5px 10px;

  font-family: "JetBrains Mono", sans-serif;
  font-size: 15px;
  font-weight: normal;

  background: #FFFFFF;
  border: 1px solid #e8edf1;
  border-radius: 10px;

  z-index: 999;

  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;

  outline: none;

  position: fixed;
  bottom: 40px;
  left: 25%;
  transform: translateX(-50%);
}

.scenario-creator {
  cursor: pointer;

  position: fixed;
  bottom: 40px;
  left: 25%;
  transform: translateX(-50%);

  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
  gap: 10px;

  padding: 5px 10px 5px 5px;

  font-family: "JetBrains Mono", sans-serif;
  font-size: 15px;
  font-weight: normal;

  background: #FFFFFF;
  border: 1px solid #e8edf1;
  border-radius: 10px;

  z-index: 999;

  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}

.scenario-creator:hover {
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translate(-50%, 10px);
}

.fade-slide-enter-to,
.fade-slide-leave-from {
  opacity: 1;
  transform: translate(-50%, 0);
}
</style>