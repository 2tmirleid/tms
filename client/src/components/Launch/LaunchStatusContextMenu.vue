<template>
  <div class="context-menu">
    <div class="status" @click="toggle">
      <span
          id="status"
          :style="{backgroundColor: status.color}"
      >
        {{ status.title }}
      </span>
    </div>

    <div
        class="dropdown-wrapper"
        v-if="isOpen"
        tabindex="-1"
        ref="dropdown"
        @blur="hide"
        @keyup.esc="hide"
    >
      <div class="close-btn">
        <CloseButton @click.stop="hide"/>
      </div>

      <ul class="dropdown">
        <li
            class="dropdown-item"
            v-for="s in statuses"
            :key="s.id"
            :style="{color: s.color}"
            @click="updateStatus(s.id)"
        >
          <span>{{ s.title }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import CloseButton from "@/components/UI/Btn/CloseButton.vue";
import {LaunchStatusMethods} from "@/api/launchStatusMethods.js";
import {LaunchMethods} from "@/api/launchMethods.js";

export default {
  inject: ['showAlert'],
  components: {CloseButton},
  props: {
    status: Object,
    launchID: Number,
    activeLaunchId: Number,
  },
  data() {
    return {
      launchMethods: new LaunchMethods(),
      statusMethods: new LaunchStatusMethods(),
      statuses: [],
    }
  },
  computed: {
    isOpen() {
      return this.activeLaunchId === this.launchID;
    }
  },
  watch: {
    isOpen(newVal) {
      if (newVal) {
        this.$nextTick(() => {
          if (this.$refs.dropdown) {
            this.$refs.dropdown.focus();
          }
        });
      }
    }
  },
  methods: {
    async getStatuses() {
      try {
        const statuses = await this.statusMethods.getStatuses();
        this.statuses = statuses.data;
      } catch (error) {
        console.error(`Error while fetching statuses`);
        this.showAlert('Что-то пошло не так.');
      }
    },
    toggle() {
      if (this.isOpen) {
        this.$emit("close");
      } else {
        this.$emit("open", this.launchID);
      }
    },
    hide() {
      this.$emit("close");
    },
    async updateStatus(statusID) {
      try {
        await this.launchMethods.updateLaunch(this.launchID, {statusId: statusID});
        this.$emit('launch-updated', this.launchID);
        this.hide();
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
  left: 0%;
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