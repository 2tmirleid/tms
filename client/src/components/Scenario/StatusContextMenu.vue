<template>
  <div class="context-menu">
    <div
        class="status"
        @click="showContextMenu"
    >
      <span id="status" :style="{backgroundColor: status.color}">{{ status.title }}</span>
    </div>

    <div
        class="dropdown-wrapper"
        v-if="showDropdown"
        tabindex="0"
        ref="dropdown"
        @blur="hideContextMenu"
        @keyup.esc="hideContextMenu"
    >
      <div class="close-btn">
        <CloseButton @click.stop="hideContextMenu"/>
      </div>

      <ul class="dropdown">
        <li
            class="dropdown-item"
            v-for="status in statuses"
            :key="status.id"
            :style="{color: status.color}"
            @click="updateStatus(status.id)"
        >
          <span>{{ status.title }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import CloseButton from "@/components/UI/Btn/CloseButton.vue";
import {StatusMethods} from "@/api/statusMethods.js";
import {ScenarioMethods} from "@/api/scenarioMethods.js";

export default {
  inject: ['showAlert'],
  components: {CloseButton},
  data() {
    return {
      scenarioMethods: new ScenarioMethods(),
      statusMethods: new StatusMethods(),
      showDropdown: false,
      statuses: [],
    }
  },
  props: {
    status: Object,
    scenarioID: Number,
  },
  methods: {
    focus() {
      this.showDropdown = true;
      this.$nextTick(() => {
        this.$refs.dropdown.focus();
      });
    },
    async getStatuses() {
      try {
        const statuses = await this.statusMethods.getStatuses();
        this.statuses = statuses.data;
      } catch (error) {
        console.error(`Error while fetching statuses`);
        this.showAlert('Что-то пошло не так.');
      }
    },
    showContextMenu() {
      this.showDropdown = true;
      this.focus();
    },
    hideContextMenu() {
      this.showDropdown = false;
    },
    async updateStatus(statusID) {
      try {
        const body = {"status": statusID};

        await this.scenarioMethods.updateScenario(this.scenarioID, body);
        this.$emit('scenario-updated', this.scenarioID);
        this.hideContextMenu()
      } catch (error) {
        console.error("Update status error:" + error);
        this.showAlert('При попытке изменить статус что-то пошло не так...');
      }
    }
  },
  mounted() {
    this.getStatuses();
  }
}
</script>

<style scoped>
.context-menu {
  position: relative;
  display: inline-block;
}

.dropdown-wrapper {
  background-color: #FFFFFF;
  position: absolute;
  right: 0%;
  top: 0%;
  padding: 8px 0;
  font-family: var(--font-primary);
  font-size: 13px;
  border-radius: 6px;
  border: 1px solid var(--border-color);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.12);
  transition: all 0.2s ease;
  min-width: 160px;
  z-index: 1000;
  outline: none;
}

.dropdown {
  list-style: none;
  margin: 0;
  padding: 0;
}

.dropdown-wrapper .close-btn {
  display: flex;
  justify-content: flex-end;
  padding: 0 8px 4px 8px;
  border-bottom: 1px solid #f0f0f0;
  margin-bottom: 4px;
}

.dropdown .dropdown-item {
  padding: 6px 12px;
  cursor: pointer;
  transition: background-color 0.15s ease;
  display: flex;
  align-items: center;
  color: #333;
}

.status #status {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-primary);
  font-size: 12px;
  max-height: 20px;
  padding: 4px;
  border-radius: 5px;
  text-align: center;
  color: #FFFFFF;
  cursor: pointer;
}

.dropdown .dropdown-item.delete:hover {
  background-color: var(--delete-color);
  color: #FFFFFF;
}

.dropdown .dropdown-item:hover {
  background-color: var(--hover-bg);
  color: #000;
}

.dropdown .dropdown-item span {
  white-space: nowrap;
}

.context-menu button.hidden {
  opacity: 0;
  pointer-events: none;
}
</style>