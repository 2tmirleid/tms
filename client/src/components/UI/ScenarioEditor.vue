<template>
  <div class="scenario-editor">
    <h4>Сценарий</h4>

    <table class="scenario-table">
      <thead>
      <tr class="scenario-row header">
        <th class="scenario-step">Шаг</th>
        <td class="scenario-result">Ожидаемый результат</td>
      </tr>
      </thead>

      <tbody>
      <tr
          v-for="(step, index) in scenarioSteps"
          :key="index"
          class="scenario-row"
      >
        <th class="scenario-step">{{ step.step }}</th>
        <td class="scenario-result">{{ step.expectedResult }}</td>
      </tr>

      <tr v-if="edit" class="scenario-row temp-step">
        <th class="scenario-step">
          <input
              ref="step"
              type="text"
              name="step"
              placeholder="Шаг"
              v-model="newStep.step"
              @keyup.enter="submitStep"
          />
        </th>
        <td class="scenario-result">
          <input
              type="text"
              name="expectedResult"
              placeholder="Ожидаемый результат"
              v-model="newStep.expectedResult"
              @keyup.enter="submitStep"
          />
        </td>
      </tr>
      </tbody>
    </table>

    <AddStepButton @click="toggleEdit" :class="{ active: edit }"/>
  </div>
</template>

<script>
import {ScenarioMethods} from "@/api/scenarioMethods";
import AddStepButton from "@/components/UI/Btn/AddStepButton.vue";

export default {
  components: {
    AddStepButton,
  },
  props: {
    scenarioSteps: {
      type: Array,
      required: true,
    },
    scenarioID: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      scenarioMethods: new ScenarioMethods(),
      edit: false,
      newStep: {
        step: "",
        expectedResult: "",
      },
    };
  },
  methods: {
    focus() {
      this.$nextTick(() => {
        this.$refs.step.focus();
      });
    },
    toggleEdit() {
      this.edit = !this.edit;
      this.edit ? this.focus() : '';
    },
    async submitStep() {
      const { step, expectedResult } = this.newStep;

      if (!step.trim()) {
        alert("Поле 'Шаг' не может быть пустым.");
        return;
      }

      try {
        const currentSteps = [...this.scenarioSteps];

        currentSteps.push({
          step: step,
          expectedResult: expectedResult || ''
        });

        const body = {
          steps: currentSteps
        };

        await this.scenarioMethods.updateScenario(this.scenarioID, body);

        this.newStep = { step: "", expectedResult: "" };
        this.edit = false;

        this.$emit('scenario-updated', this.scenarioID);
      } catch (error) {
        console.error("Ошибка при обновлении шага:", error);
        alert("Не удалось сохранить шаг");
      }
    }
  },
};
</script>

<style scoped>
.scenario-editor {
  --border-color: #e8edf1;
  --hover-bg: #edf1f5;
  --id-color: #6c757d;
  --font-primary: "JetBrains Mono", monospace, sans-serif;

  max-width: 700px;
  display: flex;
  flex-direction: column;
  padding-top: 25px;
}

.scenario-editor h4 {
  font-family: var(--font-primary);
  padding-bottom: 10px;
}

.scenario-table {
  width: 100%;
  border-collapse: collapse;
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
}

.scenario-row td,
.scenario-row th {
  width: 100%;
  padding: 10px;
  border: 1px solid #e8edf1;
  text-align: left;
}

.scenario-row.temp-step input {
  font-family: var(--font-primary);
  width: 95%;
  padding: 6px 8px;
  font-size: 14px;
  border: none;
  outline: none;
}
</style>