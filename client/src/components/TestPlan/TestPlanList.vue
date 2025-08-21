<template>
  <section
      class="test-plan-list"
  >
    <TestPlanListHeader/>

    <table
        class="test-plan-table"
    >
      <thead>
      <tr>
        <th>#</th>
        <th>Название</th>
        <th>Описание</th>
        <th>Кол-во сценариев</th>
        <th>Дата создания</th>
        <th>Дата изменения</th>
      </tr>
      </thead>

      <tbody>
      <tr v-for="testPlan in testPlans" :key="testPlan.id">
        <th class="test-plan-row">{{ testPlan.id }}</th>
        <td
            class="test-plan-row"
            @contextmenu.prevent="showContextMenu(testPlan)"
            @dblclick.stop="startEditTitle(testPlan)"
        >
          <span id="title" v-if="editedTitleID !== testPlan.id">
            {{ testPlan.title }}
          </span>

          <input
              v-else
              ref="titleInput"
              v-model="updatedTestPlanTitle"
              class="new-test-plan-title"
              :placeholder="testPlan.title"
              @blur="cancelEditTitle"
              @keyup.enter="saveTitle(testPlan.id)"
              @keyup.esc="cancelEditTitle"
          />

          <TestPlanContextMenu
              v-if="activeContextMenuId === testPlan.id"
              :testPlan="testPlan"
              @close="activeContextMenuId = null"
              @rename-test-plan="startEditTitle"
              @edit-description-test-plan="startEditDescription"
              @edit-scenarios-test-plan="showScenariosModal"
              @delete-test-plan="deleteTestPlan"
              @launch-test-plan="showLaunchModal(testPlan.id)"
          />
        </td>
        <td
            class="test-plan-row"
            @dblclick.stop="startEditDescription(testPlan)"
        >
          <span id="description" v-if="editedDescriptionID !== testPlan.id">
            {{ testPlan.description }}
          </span>

          <input
              v-else
              ref="descriptionInput"
              v-model="updatedTestPlanDescription"
              class="new-test-plan-title"
              :placeholder="testPlan.description"
              @blur="cancelEditDescription"
              @keyup.enter="saveDescription(testPlan.id)"
              @keyup.esc="cancelEditDescription"
          />
        </td>
        <td class="test-plan-row">{{ testPlan.scenarios.length }}</td>
        <td class="test-plan-row">{{ convertDate(testPlan.createdAt) }}</td>
        <td class="test-plan-row">{{ convertDate(testPlan.updatedAt) }}</td>
      </tr>
      </tbody>
    </table>

    <div class="overlay" v-if="editingScenarios || launchModal"></div>

    <TestPlanScenariosModal
      v-if="editingScenarios"
      :testPlanID="modalTestPlanID"
      @close-modal="editingScenarios = false"
      @scenarios-updated="handleScenariosUpdated"
    />

    <CreateLaunchModal
      v-if="launchModal"
      :testPlanID="launchedTestPlanID"
      @close-modal="launchModal = false"
      @create-launch="handleLaunchCreated"
    />

    <TestPlanCreator
        @test-plan-created="refreshTestPlans"
    />
  </section>
</template>

<script>
import TestPlanListHeader from "@/components/TestPlan/TestPlanListHeader.vue";
import {TestPlanMethods} from "@/api/testPlanMethods.js";
import {convertDate} from "@/utils/dateConverter.js";
import TestPlanCreator from "@/components/TestPlan/TestPlanCreator.vue";
import TestPlanContextMenu from "@/components/TestPlan/TestPlanContextMenu.vue";
import FolderContextMenu from "@/components/Folder/FolderContextMenu.vue";
import TestPlanScenariosModal from "@/components/TestPlan/Modal/TestPlanScenariosModal.vue";
import CreateLaunchModal from "@/components/Launch/Modal/CreateLaunchModal.vue";
import {LaunchMethods} from "@/api/launchMethods.js";

export default {
  components: {
    CreateLaunchModal,
    TestPlanScenariosModal, FolderContextMenu, TestPlanContextMenu, TestPlanCreator, TestPlanListHeader},
  inject: ['showAlert'],
  data() {
    return {
      testPlanMethods: new TestPlanMethods(),
      launchMethods: new LaunchMethods(),
      testPlans: [],
      activeContextMenuId: null,
      editedTitleID: null,
      updatedTestPlanTitle: '',
      editedDescriptionID: null,
      updatedTestPlanDescription: '',
      editingScenarios: false,
      modalTestPlanID: null,
      launchModal: false,
      launchedTestPlanID: null,
    }
  },
  methods: {
    convertDate,
    handleScenariosUpdated() {
      this.refreshTestPlans();
      this.editingScenarios = false;
    },

    async handleLaunchCreated(launch) {
      const body = {
        "title": launch.title,
        "description": launch.description,
        "testPlanId": launch.testPlan
      };

      try {
        await this.launchMethods.createLaunch(body);

        this.launchModal = false;
        this.launchedTestPlanID = null;

        this.showAlert(`Запуск ${launch.title} успешно создан!`);

        await this.refreshTestPlans();
      } catch (error) {
        this.showAlert('Что-то пошло не так...');
        console.error(`Error while creating launch: ${error.message}`);
      }
    },

    async refreshTestPlans() {
      try {
        const response = await this.testPlanMethods.getTestPlans();
        this.testPlans = response.data.sort((a, b) => a.id - b.id);
      } catch (error) {
        this.showAlert('Что-то пошло не так...');
        console.error(`Error while fetching test-plans list: ${error.message}`);
      }
    },
    async showContextMenu(testPlan) {
      this.activeContextMenuId = testPlan.id;
    },

    async showScenariosModal(testPlan) {
      this.editingScenarios = true;
      this.modalTestPlanID = testPlan.id;
    },

    async showLaunchModal(id) {
      this.launchModal = true;
      this.launchedTestPlanID = id;
    },

    startEditTitle(testPlan) {
      this.editedTitleID = testPlan.id;
      this.updatedTestPlanTitle = testPlan.title;

      this.$nextTick(() => {
        if (this.$refs.titleInput?.length) {
          const input = this.$refs.titleInput[0];
          input.focus();
        }
      });
    },

    cancelEditTitle() {
      this.editedTitleID = null;
      this.updatedTestPlanTitle = '';
    },

    async saveTitle(id) {
      try {
        if (!this.updatedTestPlanTitle.trim()) {
          this.showAlert('Название тест-плана не может быть пустым.');
          return;
        }

        const body = {"title": this.updatedTestPlanTitle.trim() || this.testPlans.find(t => t.id === id).title};

        await this.testPlanMethods.updateTestPlan(id, body);

        await this.refreshTestPlans();
        this.cancelEditTitle();
      } catch (error) {
        console.error("Update title error:" + error);
        this.showAlert('При попытке изменить название что-то пошло не так...');
      }
    },

    startEditDescription(testPlan) {
      this.editedDescriptionID = testPlan.id;
      this.updatedTestPlanDescription = testPlan.description;

      this.$nextTick(() => {
        if (this.$refs.descriptionInput?.length) {
          const input = this.$refs.descriptionInput[0];
          input.focus();
        }
      });
    },

    cancelEditDescription() {
      this.editedDescriptionID = null;
      this.updatedTestPlanDescription = '';
    },

    async saveDescription(id) {
      try {
        const body = {"description": this.updatedTestPlanDescription.trim() || this.testPlans.find(t => t.id === id).description};

        await this.testPlanMethods.updateTestPlan(id, body);

        await this.refreshTestPlans();
        this.cancelEditDescription();
      } catch (error) {
        console.error("Update description error:" + error);
        this.showAlert('При попытке изменить описание что-то пошло не так...');
      }
    },

    async deleteTestPlan(testPlan) {
      try {
        await this.testPlanMethods.deleteTestPlan(testPlan.id);
        await this.refreshTestPlans();
      } catch (error) {
        console.error("Delete test-plan error:" + error);
        this.showAlert('При попытке удалить тест-план что-то пошло не так...');
      }
    }
  },
  mounted() {
    this.refreshTestPlans();
  }
}
</script>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(4px);
  z-index: 5;
}

.test-plan-list {
  height: calc(100vh - 60px);
  width: 100%;
  border: 1px solid var(--border-color);
  background-color: #FFFFFF;
  border-radius: 20px;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.05);

  font-family: var(--font-primary);
}

.test-plan-table {
  padding: 20px;
  width: 100%;
  border: 1px solid var(--border-color);
  border-collapse: collapse;
}

.test-plan-table tbody tr th, td {
  cursor: pointer;
}

.test-plan-table th,
.test-plan-table td {
  padding: 12px 15px;
  border: 2px solid var(--border-color);
  text-align: left;
  vertical-align: middle;
  white-space: nowrap;
  font-size: 14px;
}

.test-plan-table thead {
  background-color: #f9fbfb;
}

.test-plan-table thead tr th {
  font-size: 16px;
}

.new-test-plan-title {
  width: 100%;

  font-family: var(--font-primary);
  font-size: 14px;
  font-weight: normal;

  background: none;
  border: none;
  outline: none;
}
</style>