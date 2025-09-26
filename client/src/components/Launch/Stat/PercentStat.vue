<template>
  <div class="percents-wrapper">
    <svg class="circle" viewBox="0 0 36 36">
      <circle
          cx="18" cy="18" r="15.915"
          fill="none"
          stroke="#eee"
          stroke-width="3"
      />

      <circle
          v-for="(segment, index) in segments"
          :key="index"
          cx="18" cy="18" r="15.915"
          fill="none"
          :stroke="segment.color"
          stroke-width="3"
          :stroke-dasharray="segment.dasharray"
          :stroke-dashoffset="segment.dashoffset"
      />
    </svg>

    <div class="percents">
      <span>{{ successPercent }}%</span>
    </div>

    <div class="legend">
      <div class="legend-item">
        <span class="color-dot" style="background-color: #28a745"></span>
        <span>Успешные: {{ percents.successful }}</span>
      </div>
      <div class="legend-item">
        <span class="color-dot" style="background-color: #c00000"></span>
        <span>Неуспешные: {{ percents.failed }}</span>
      </div>
      <div class="legend-item">
        <span class="color-dot" style="background-color: #e1e8ed"></span>
        <span>В процессе: {{ percents.inProgress }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { LaunchResultMethods } from "@/api/launchResultMethods.js";

export default {
  data() {
    return {
      launchResultMethods: new LaunchResultMethods(),
      percents: {
        inProgress: 0,
        failed: 0,
        successful: 0
      }
    }
  },
  props: {
    launchID: String | Number
  },
  methods: {
    async refreshStat() {
      await this.refreshPercent();
    },
    async refreshPercent() {
      this.percents = { inProgress: 0, failed: 0, successful: 0 };

      const response = await this.launchResultMethods.getResults(this.launchID);

      for (const result of response.data) {
        const status = result.status;

        if (status.title === 'В процессе') this.percents.inProgress += 1;
        if (status.title === 'Не пройден') this.percents.failed += 1;
        if (status.title === 'Пройден') this.percents.successful += 1;
      }
    }
  },
  computed: {
    total() {
      return this.percents.successful + this.percents.failed + this.percents.inProgress;
    },
    successPercent() {
      return this.total > 0
          ? Math.round((this.percents.successful / this.total) * 100)
          : 0;
    },
    segments() {
      if (this.total === 0) return [];

      const parts = [
        { value: this.percents.inProgress, color: "#e1e8ed" },
        { value: this.percents.failed, color: "#c00000" },
        { value: this.percents.successful, color: "#28a745" }
      ];

      let offset = 0;
      return parts.map(p => {
        const percent = (p.value / this.total) * 100;
        const dasharray = `${percent} ${100 - percent}`;
        const dashoffset = -offset;
        offset += percent;
        return {
          color: p.color,
          dasharray,
          dashoffset
        };
      });
    }
  },
  mounted() {
    this.refreshStat()
  }
}
</script>

<style scoped>
.percents-wrapper {
  margin-top: 10px;
  margin-left: 10px;
  border: 2px solid var(--border-color);
  border-radius: 10px;
  transition: ease 0.3s;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.05);
  width: 400px;
  height: 350px;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.circle {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.percents {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 48px;
  font-weight: bold;
}

.percents-wrapper:hover {
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.legend {
  position: absolute;
  bottom: 60px;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}

.color-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: inline-block;
}
</style>