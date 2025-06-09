<template>
  <section class="scenario-viewer">
    <div class="scenario-viewer__header">
      <h3 id="id"># {{ localScenario.id }}</h3>
      <h3>{{ localScenario.title }}</h3>
    </div>

    <div class="scenario-viewer__content">
      <div class="description">
        <h4>Описание</h4>

        <p>
          {{ localScenario.description }}
        </p>
      </div>

      <div class="precondition">
        <h4>Предусловие</h4>

        <p>
          {{ localScenario.precondition }}
        </p>
      </div>

      <div class="scenario">
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
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script>
import {ScenarioMethods} from "@/api/scenarioMethods.js";

export default {
  props: {
    scenario: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      localScenario: {}
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
    }
  },
  mounted() {
    this.getScenarioByID(this.scenario.id);
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
</style>