<template>
  <section class="scenario-viewer">
    <div class="scenario-viewer__header">
      <h3 id="id"># {{ localScenario.id }}</h3>
      <h3>{{ localScenario.title }}</h3>
    </div>

    <div class="scenario-viewer__content">
      <div class="description field">
        <div class="content">
          <h4>Описание</h4>

          <p v-if="!isEdit.description">
            {{ localScenario.description }}
          </p>

          <FieldRedactor
              v-else
              name="description"
              v-model="updatedValue"
              @keyup.enter="updateScenario"
              :defaultValue="localScenario.description"
              @blur="isEdit.description = false"
          />
        </div>

        <img
            v-if="!isEdit.description"
            id="edit"
            src="@/public/edit.svg"
            alt="Редактировать"
            @click="isEdit.description = true"
        >
      </div>

      <div class="precondition field">
        <div class="content">
          <h4>Предусловие</h4>

          <p v-if="!isEdit.precondition">
            {{ localScenario.precondition }}
          </p>

          <FieldRedactor
              v-else
              name="precondition"
              v-model="updatedValue"
              @keyup.enter="updateScenario"
              :defaultValue="localScenario.precondition"
              @blur="isEdit.precondition = false"
          />
        </div>

        <img
            v-if="!isEdit.precondition"
            id="edit"
            src="@/public/edit.svg"
            alt="Редактировать"
            @click="isEdit.precondition = true"
        >
      </div>

      <div class="scenario field">
        <div class="content">
          <h4>Сценарий</h4>

          <table>
            <thead>
            <tr>
              <th>Шаг</th>
              <th>Ожидаемый результат</th>
            </tr>
            </thead>

            <tbody>
            <tr
                v-for="(step, index) in localScenario.steps"
                :key="index"
            >
              <th>{{ step.step }}</th>
              <td>{{ step.expectedResult }}</td>
            </tr>

            <tr
                v-if="isEdit.scenario"
                class="temp_step_and_expected-result"
            >
              <th>
                <input
                    type="text"
                    name="step"
                    placeholder="Шаг"
                    v-model="newStep.step"
                    @keyup.enter="submitStep"
                    @blur="handleUpdateScenario"
                >
              </th>
              <td>
                <input
                    type="text"
                    name="expectedResult"
                    placeholder="Ожидаемый результат"
                    v-model="newStep.expectedResult"
                    @keyup.enter="submitStep"
                    @blur="handleUpdateScenario"
                >
              </td>
            </tr>
            </tbody>
          </table>

          <button
              class="addStep"
              @click="handleUpdateScenario"
              :class="{'active' : isEdit.scenario}"
          >
            <img src="@/public/add.svg" alt="Добавить шаг">
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import {ScenarioMethods} from "@/api/scenarioMethods.js";
import FieldRedactor from "@/components/UI/FieldRedactor.vue";

export default {
  components: {FieldRedactor},
  props: {
    scenario: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      localScenario: {},
      isEdit: {
        description: false,
        precondition: false,
        scenario: false
      },
      updatedValue: '',
      newStep: {
        step: '',
        expectedResult: ''
      }
    }
  },
  methods: {
    async getScenarioByID(id) {
      const scenarioMethods = new ScenarioMethods();

      try {
        const response = await scenarioMethods.getScenarioByID(id);
        this.localScenario = response.data;
      } catch (error) {
        console.error("Error while getting scenarios: ", error);
      }
    },
    async updateScenario(event) {
      const field = event.target.name;
      const value = event.target.value;

      const scenarioMethods = new ScenarioMethods();

      try {
        const response = await scenarioMethods.updateScenario(
            this.localScenario.id,
            field,
            value
        );

        this.isEdit[field] = false;
        await this.getScenarioByID(this.localScenario.id);
      } catch (error) {
        console.error("Error while getting scenarios: ", error);
      }
    },
    handleUpdateScenario() {
      this.isEdit.scenario = !this.isEdit.scenario;
    },
    async submitStep() {
      const { step, expectedResult } = this.newStep;

      if (!step.trim()) {
        alert("Поле 'Шаг' не может быть пустым.");
        return;
      }

      const updatedSteps = [
        ...this.localScenario.steps,
        {
          step: step.trim(),
          expectedResult: expectedResult?.trim() || ""
        }
      ];

      const scenarioMethods = new ScenarioMethods();

      try {
        await scenarioMethods.updateScenario(
            this.localScenario.id,
            'steps',
            updatedSteps
        );

        // Очистить временные поля и выйти из режима редактирования
        this.newStep.step = '';
        this.newStep.expectedResult = '';
        this.isEdit.scenario = false;

        // Обновить локальный сценарий
        await this.getScenarioByID(this.localScenario.id);
      } catch (error) {
        console.error("Ошибка при добавлении шага:", error);
      }
    },
  },
  // mounted() {
  //   this.getScenarioByID(this.scenario.id);
  // },
  watch: {
    'scenario.id': {
      immediate: true,
      deep: true,
      handler(newID) {
        if (newID) {
          this.getScenarioByID(newID);
        }
      }
    }
  }
}
</script>

<style scoped>
.scenario-viewer {
  width: 60%;
  border-top: 1px solid #e8edf1;
  border-right: 1px solid #e8edf1;
  border-bottom: 1px solid #e8edf1;
  background-color: #FFFFFF;
  border-bottom-right-radius: 20px;
  border-top-right-radius: 20px;

  padding: 25px 10px 10px 40px;
}

.scenario-viewer__content {
  .description,
  .precondition,
  .scenario {
    h4 {
      padding-bottom: 5px;
    }
  }

  padding-top: 25px;
  font-family: "JetBrains Mono", sans-serif;

  display: flex;
  flex-direction: column;
  gap: 25px;

  p {
    font-weight: normal;
    font-size: 14px;
  }

  table {
    max-width: 700px;
    display: flex;
    flex-direction: column;
    border: 1px solid #e8edf1;

    thead {
      background-color: #f9fbfb;

      tr {
        display: flex;
        justify-content: space-between;
        padding: 10px 10px 10px 10px;
        border: 1px solid #e8edf1;

        th {
          width: 50%;
          border-right: 1px solid #e8edf1;

          &:last-child {
            border: none;
          }
        }
      }
    }

    tbody {
      font-size: 15px;

      tr {
        display: flex;
        justify-content: space-between;
        padding: 10px;
        border: 1px solid #e8edf1;

        th, td {
          width: 50%;
          border-right: 1px solid #e8edf1;
          text-align: left;
          box-sizing: border-box;
        }

        th:last-child,
        td:last-child {
          border-right: none;
        }

        td {
          padding-left: 10px;
        }
      }
    }
  }
}

.scenario-viewer__header {
  border-bottom: 1px solid #e8edf1;
  padding-bottom: 25px;
  padding-left: 10px;

  display: flex;
  gap: 20px;

  h3 {
    font-weight: normal;
    font-family: "JetBrains Mono", sans-serif;
    color: #000000;
  }

  #id {
    color: gray;
  }
}

.field {
  display: flex;
  gap: 20px;
}

#edit {
  cursor: pointer;
}

.addStep {
  position: relative;
  bottom: 10px;
  right: 10px;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 32px;
  height: 32px;

  border: 1px solid #e8edf1;
  border-radius: 50%;

  background: #FFFFFF;

  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  cursor: pointer;
}

.addStep:hover {
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.addStep.active {
  transform: rotate(43deg);
}

.scenario {
  position: relative;
  display: inline-block;
}

.temp_step_and_expected-result {
  th,
  td {
    input {
      width: 95%;
      height: 100%;
      font-family: "JetBrains Mono", sans-serif;
      font-size: 15px;
      background: none;
      border: none;
      outline: none;
    }
  }
}
</style>