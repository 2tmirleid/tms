<template>
  <div class="creators">
    <transition name="fade-slide">
      <button
          v-if="!isNewTestPlan"
          class="creator"
          @click="activateNewTestPlan"
          key="button"
      >
        <AddIcon/>
        Тест-план
      </button>
    </transition>
  </div>

  <transition name="fade-slide">
    <input
        v-if="isNewTestPlan"
        class="new"
        type="text"
        placeholder="Название тест-плана"
        ref="testPlanInput"
        v-model="newTestPlanName"
        @blur="cancelSavingTestPlan"
        @keyup.enter="saveTestPlan"
        @keyup.esc="cancelSavingTestPlan"
        key="input"
    />
  </transition>
</template>

<script>
import AddIcon from "@/components/UI/Icons/AddIcon.vue";
import {TestPlanMethods} from "@/api/testPlanMethods.js";

export default {
  inject: ["showAlert"],

  components: {AddIcon},
  data() {
    return {
      isNewTestPlan: false,
      newTestPlanName: '',
      testPlanMethods: new TestPlanMethods(),
    };
  },
  methods: {
    activateNewTestPlan() {
      this.isNewTestPlan = true;
      this.$nextTick(() => {
        this.$refs.testPlanInput.focus();
      });
    },
    cancelSavingTestPlan() {
      this.newTestPlanName = '';
      this.isNewTestPlan = false;
    },
    async saveTestPlan() {
      try {
        if (this.newTestPlanName.length > 255) {
          this.showAlert('Название тест-плана не может быть больше 255 символов');
          return;
        }

        if (!this.newTestPlanName.trim()) {
          this.showAlert('Название тест-плана не может быть пустым.');
          return;
        }

        const body = { "title": this.newTestPlanName }

        await this.testPlanMethods.createTestPlan(body);

        this.$emit('test-plan-created');
        this.cancelSavingTestPlan();
      } catch (e) {
        this.showAlert('При попытке сохранить тест-план что-то пошло не так...');
        console.error("Error while creating test-plan: ", e);
      }
    },
  },
};
</script>

<style scoped>
.new {
  width: 50%;
  padding: 5px 10px;
  font-family: var(--font-primary);
  font-size: 15px;
  font-weight: normal;
  background: #FFFFFF;
  border: 1px solid var(--border-color);
  border-radius: 10px;
  z-index: 999;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
  outline: none;
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
}

.creators {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  z-index: 999;
}

.creator {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 5px 10px;
  font-family: var(--font-primary);
  font-size: 15px;
  background: #FFFFFF;
  border: 1px solid var(--border-color);
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}

.creator:hover {
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