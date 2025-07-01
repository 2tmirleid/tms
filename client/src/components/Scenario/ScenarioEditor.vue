<template>
  <div class="scenario-editor">
    <h4>Сценарий</h4>

    <div class="table-wrapper">
      <table class="scenario-table">
        <thead>
        <tr class="scenario-row header">
          <th class="scenario-step">Шаг</th>
          <th class="scenario-result">Ожидаемый результат</th>
        </tr>
        </thead>

        <tbody>
        <tr
            v-for="(step, index) in scenarioSteps"
            :key="index"
            class="scenario-row"
        >
          <th
              class="scenario-step"
              @dblclick="startEditStep(step, 'step')"
          >
            <input
                v-if="edit.active && step.id === edit.editableStepID && edit.editingField === 'step'"
                class="editable-step"
                ref="stepInput"
                type="text"
                v-model="editableStep.step"
                @blur="finishEdit"
                @keyup.enter="finishEdit"
            >
            <div v-else class="step">
              {{ step.step }}
            </div>
          </th>
          <td
              class="scenario-result"
              @dblclick="startEditStep(step, 'expectedResult')"
              @mouseenter="toggleShowDeleteIcon(step.id)"
              @mousedown="toggleShowDeleteIcon"
              @mouseleave="toggleShowDeleteIcon"
          >
            <input
                v-if="edit.active && step.id === edit.editableStepID && edit.editingField === 'expectedResult'"
                class="editable-result"
                ref="resultInput"
                type="text"
                v-model="editableStep.expectedResult"
                @blur="finishEdit"
                @keyup.enter="finishEdit"
            >
            <div v-else>
              {{ step.expectedResult }}
            </div>
          </td>

          <td class="context-menu-cell">
            <StepContextMenu
                :stepID="step.id"
                @delete-step="deleteStep"
                @editStep-step="startEditStep(step, 'step')"
                @editER-step="startEditStep(step, 'expectedResult')"
            />
          </td>
        </tr>

        <tr v-if="add" class="scenario-row temp-step">
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
    </div>

    <AddStepButton @click="toggleAdd" :class="{ active: add }"/>
  </div>
</template>

<script>
import {ScenarioMethods} from "@/api/scenarioMethods.js";
import AddStepButton from "@/components/UI/Btn/AddStepButton.vue";
import DeleteButton from "@/components/UI/Btn/DeleteButton.vue";
import StepContextMenuButton from "@/components/UI/Btn/StepContextMenuButton.vue";
import StepContextMenu from "@/components/Scenario/StepContextMenu.vue";

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
    scenarioID: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      scenarioMethods: new ScenarioMethods(),
      add: false,
      edit: {
        active: false,
        editableStepID: 0,
        editingField: ''
      },
      editableStep: {
        id: 0,
        step: "",
        expectedResult: "",
      },
      newStep: {
        step: "",
        expectedResult: "",
      },
      deletingStepID: 0,
      showDeleteIcon: false,
    };
  },
  methods: {
    toggleAdd() {
      this.add = !this.add;
      this.add ? this.$nextTick(() => {
        this.$refs.step.focus();
      }) : '';
    },
    async submitStep() {
      const {step, expectedResult} = this.newStep;

      if (!step.trim()) {
        this.showAlert("Поле 'Шаг' не может быть пустым.");
        return;
      }

      if (step.length > 255 || expectedResult.length > 255) {
        this.showAlert('Поля "Шаг" и "Ожидаемый результат" не могут превышать 255 символов.');
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

        this.newStep = {step: "", expectedResult: ""};
        this.add = false;

        this.$emit('scenario-updated', this.scenarioID);
      } catch (error) {
        console.error("Ошибка при обновлении шага:", error);
        this.showAlert("Не удалось сохранить шаг");
      }
    },
    startEditStep(step, field) {
      this.edit.active = true;
      this.edit.editableStepID = step.id;
      this.edit.editingField = field;
      this.editableStep = {...step};

      this.$nextTick(() => {
        const refName = field === 'step' ? 'stepInput' : 'resultInput';
        if (this.$refs[refName]?.[0]) {
          this.$refs[refName][0].focus();
        }
      });
    },

    async finishEdit() {
      if (this.editableStep.step.trim()) {
        await this.editScenario();
      } else {
        this.cancelEdit();
      }
    },

    cancelEdit() {
      this.edit.active = false;
      this.edit.editableStepID = 0;
      this.edit.editingField = '';
      this.editableStep = {id: 0, step: "", expectedResult: ""};
    },
    async editScenario() {
      if (this.editableStep.step.length > 255 || this.editableStep.expectedResult.length > 255) {
        this.showAlert('Поля "Шаг" и "Ожидаемый результат" не могут превышать 255 символов.');
        return;
      }

      try {
        const currentSteps = [...this.scenarioSteps];
        const stepIndex = currentSteps.findIndex(s => s.id === this.edit.editableStepID);

        if (stepIndex !== -1) {
          currentSteps[stepIndex] = {
            ...currentSteps[stepIndex],
            step: this.editableStep.step.trim(),
            expectedResult: this.editableStep.expectedResult.trim()
          };

          await this.scenarioMethods.updateScenario(
              this.scenarioID,
              {steps: currentSteps}
          );

          this.cancelEdit();
          this.$emit('scenario-updated', this.scenarioID);
        }
      } catch (error) {
        console.error("Ошибка при обновлении шага:" + error);
        this.showAlert("Не удалось сохранить изменения");
      }
    },
    toggleShowDeleteIcon(id) {
      setTimeout(() => {
        this.deletingStepID = id;
        this.showDeleteIcon = !this.showDeleteIcon;
      }, 1000);
    },
    async deleteStep(id) {
      try {
        await this.scenarioMethods.deleteStep(id);

        this.deletingStepID = 0;
        this.$emit('scenario-updated', this.scenarioID);
      } catch (error) {
        console.error("Ошибка при удалении шага:" + error);
        this.showAlert("Не удалось удалить шаг");
      }
    }
  },
};
</script>

<style scoped>
.scenario-editor {
  max-width: 700px;
  display: flex;
  flex-direction: column;
  padding-top: 25px;
}

.scenario-editor h4 {
  font-family: var(--font-primary);
  padding-bottom: 10px;
}

.table-wrapper {
  max-height: 400px;
  overflow-y: auto;
  box-sizing: border-box;
}

.scenario-table {
  width: 95%;
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
  width: 100%;
  padding: 10px;
  border: 1px solid #e8edf1;
  text-align: left;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.scenario-row.temp-step input {
  font-family: var(--font-primary);
  width: 95%;
  padding: 6px 8px;
  font-size: 14px;
  border: none;
  outline: none;
}

.scenario-step .editable-step, .editable-result {
  width: 100%;
  height: 100%;
  font-family: var(--font-primary);
  font-size: 14px;
  background: none;
  border: none;
  outline: none;
  color: #000000 !important;
}

</style>
