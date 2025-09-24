<template>
  <div class="launch-scenario-runner-comment">
    <div class="new-comment-section">
      <textarea
          class="new-comment"
          placeholder="Комментировать"
          v-model="localValue"
      ></textarea>

      <div class="comment-actions">
        <button
            class="save-btn"
            @click="createComment()"
        >
          Сохранить
        </button>
        <button
            class="cancel-btn"
            @click="this.localValue = ''"
        >
          Отмена
        </button>
      </div>
    </div>

    <ul class="comments">
      <li
        class="comment"
        v-for="comment in comments"
        :key="comment.id"
      >
        <div class="comment__header">
          <div class="left">
            <div class="avatar">
              <span>{{ comment.user.email.charAt(0).toUpperCase() }}</span>
            </div>
          </div>

          <div class="right">
            <div class="update_date">
              <span>изм. {{ convertDate(comment.updatedAt) }}</span>
            </div>
          </div>
        </div>

        <div class="comment__body">
          <p>{{ comment.body }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import {LaunchResultCommentMethods} from "@/api/launchResultCommentMethods.js";
import {convertDate} from "@/utils/dateConverter.js";
import {jwtDecode} from "jwt-decode";

export default {
  inject: ['showAlert'],
  props: {
    resultID: Number | String,
  },
  data() {
    return {
      commentMethods: new LaunchResultCommentMethods(),
      comments: [],
      localValue: '',
      userID: null,
    }
  },
  methods: {
    getUserID() {
      const token = localStorage.getItem("accessToken");
      if (token) {
        const decoded = jwtDecode(token);
        this.userID = Number(decoded.id);
      }
    },
    convertDate,
    async refreshComments() {
      try {
        const response = await this.commentMethods.getComments(this.resultID);
        this.comments = [...response.data].sort((a, b) => b.id - a.id);
      } catch (e) {
        this.showAlert('Что-то пошло не так...');
        console.error(`Error while fetching comments: ${e.message}`);
      }
    },
    async createComment() {
      try {
        if (this.localValue.length > 255) {
          this.showAlert('Длина комментария не может превышать 255 символов');
          return;
        }

        if (this.localValue.length === 0) {
          this.showAlert('Комментарий не может быть пустым');
          return;
        }

        const body = {
          "body" : this.localValue,
          "user_id" : this.userID
        }

        await this.commentMethods.createComment(this.resultID, body);
        this.localValue = '';
        await this.refreshComments();
      } catch (e) {
        this.showAlert('Что-то пошло не так...');
        console.error(`Error while creating comment: ${e.message}`);
      }
    }
  },
  mounted() {
    this.refreshComments();
    this.getUserID();
  }
}
</script>

<style scoped>


.avatar {
  width: 30px;
  height: 30px;
  border: 1px solid var(--border-color);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;
}

.comments {
  margin-top: 10px;
  list-style: none;
  max-height: 180px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.comment {
  border: 2px solid var(--border-color);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: var(--font-primary);
  font-size: 14px;
  border-radius: 10px;
}

.comment__header {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  align-items: center;
  align-content: center;
  border-bottom: 2px solid var(--border-color);
}

.comment__body {
  padding: 10px;
}

.new-comment {
  width: 95%;
  min-height: 60px;
  max-height: 60px;
  padding: 10px;
  font-family: var(--font-primary);
  font-size: 14px;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  resize: vertical;
  outline: none;
}

.comment-actions {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.save-btn, .cancel-btn {
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
  font-family: var(--font-primary);
  transition: all 0.2s ease;
}

.save-btn {
  background-color: #4CAF50;
  color: white;
  border: 1px solid #4CAF50;
}

.save-btn:hover {
  background-color: #43a047;
  border-color: #43a047;
}

.cancel-btn {
  background-color: #f8f9fa;
  border: 1px solid #e8edf1;
  color: #6c757d;
}

.cancel-btn:hover {
  background-color: #e8edf1;
  border-color: #dae0e5;
}
</style>