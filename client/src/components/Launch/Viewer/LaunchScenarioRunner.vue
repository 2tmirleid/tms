<template>
  <div class="launch-scenario-runner">
    <h4>Сценарий</h4>

    <div class="table-wrapper">
      <table class="scenario-table">
        <thead>
        <tr class="scenario-row header">
          <th class="scenario-checkbox"></th>
          <th class="scenario-step">Шаг</th>
          <th class="scenario-result">Ожидаемый результат</th>
        </tr>
        </thead>

        <tbody>
        <tr
            v-for="step in localSteps"
            :key="step.id"
            class="scenario-row"
        >
          <td class="scenario-checkbox">
            <input
                type="checkbox"
                class="round-checkbox"
                :style="{ backgroundColor: step.status.color, borderColor: step.status.color }"
                :checked="step.status.title === 'Пройден' || step.status.title === 'Не пройден'"
                @click.stop="checkPositive(step.id)"
                @contextmenu.prevent.stop="checkNegative(step.id)"
            >
          </td>
          <th class="scenario-step">
            <div class="step">
              {{ step.step.step }}
            </div>
          </th>
          <td class="scenario-result">
            <div>
              {{ step.step.expectedResult }}
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import AddStepButton from "@/components/UI/Btn/AddStepButton.vue";
import DeleteButton from "@/components/UI/Btn/DeleteButton.vue";
import StepContextMenuButton from "@/components/UI/Btn/StepContextMenuButton.vue";
import StepContextMenu from "@/components/Scenario/StepContextMenu.vue";
import {LaunchStepResultMethods} from "@/api/launchStepResultMethods.js";

export default {
  inject: ["showAlert"],
  components: {
    StepContextMenu,
    StepContextMenuButton,
    DeleteButton,
    AddStepButton,
  },
  props: {
    scenarioSteps: {
      type: Array,
      required: true,
    },
    scenario: {
      type: Object,
      required: true,
    },
    launchResult: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      localSteps: [...this.scenarioSteps],
      resultStepMethods: new LaunchStepResultMethods(),
    };
  },
  methods: {
    async checkPositive(stepId) {
      try {
        const body = {
          "statusId": 2
        }

        await this.resultStepMethods.updateStepResult(stepId, body);
        this.$emit('step-updated', this.launchResult.id)
      } catch (e) {
        this.showAlert('Что-то пошло не так...');
        console.error(`Error while check positive: ${e.message}`);
      }
    },
    async checkNegative(stepId) {
      try {
        const body = {
          "statusId": 3
        }

        await this.resultStepMethods.updateStepResult(stepId, body);
        this.$emit('step-updated', this.launchResult.id)
      } catch (e) {
        this.showAlert('Что-то пошло не так...');
        console.error(`Error while check negative: ${e.message}`);
      }
    }
  },
  watch: {
    scenarioSteps: {
      immediate: true,
      deep: true,
      handler(newSteps) {
        this.localSteps = JSON.parse(JSON.stringify(newSteps || []));
      }
    }
  },
  beforeDestroy() {
    this.localSteps = [];
  },
};
</script>

<style scoped>
.launch-scenario-runner {
  max-width: 700px;
  display: flex;
  flex-direction: column;
  padding-top: 25px;
}

.launch-scenario-runner h4 {
  font-family: var(--font-primary);
  padding-bottom: 10px;
}

.table-wrapper {
  min-height: 200px;
  max-height: 400px;
  overflow-y: auto;
  box-sizing: border-box;
  position: relative;
}

.scenario-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  font-family: var(--font-primary);
  font-size: 14px;
  table-layout: fixed;
}

.scenario-row.header {
  background-color: #f9fbfb;
  font-weight: bold;
  font-size: 15px;
}

.scenario-row.header th {
  text-align: center;
  position: sticky;
  top: 0;
  background-color: #f9fbfb;
  z-index: 2;
}

.scenario-row td,
.scenario-row th {
  padding: 10px;
  border: 1px solid #e8edf1;
  text-align: left;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.scenario-checkbox {
  width: 30px;
  text-align: center;
  vertical-align: middle;
  border: none !important;
}

.round-checkbox {
  appearance: none;
  width: 20px;
  height: 20px;
  border: 2px solid #ccc;
  border-radius: 50%;
  outline: none;
  cursor: pointer;
  position: relative;
  margin: 0;
  vertical-align: middle;
}

/*
.round-checkbox.positive:checked {
  border-color: #4caf50;
  background-color: #4caf50;
}

.round-checkbox.negative:checked {
  border-color: #4caf50;
  background-color: #4caf50;
}
 */

.scenario-row.temp-step input {
  font-family: var(--font-primary);
  width: 95%;
  padding: 6px 8px;
  font-size: 14px;
  border: none;
  outline: none;
}

.scenario-row.header .scenario-checkbox {
  border: none;
  background-color: #ffffff;
}
</style>