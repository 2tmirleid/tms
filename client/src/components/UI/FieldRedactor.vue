<template>
  <textarea
      ref="textarea"
      :name="name">{{ defaultValue }}</textarea>
</template>

<script>
export default {
  props: {
    defaultValue: {
      type: String
    },
    name: {
      type: String,
      required: true
    }
  },
  methods: {

  },
  mounted() {
    this.$refs.textarea.focus();
  }
}
</script>

<style scoped>
textarea {
  min-width: 750px;
  min-height: 80px;

  text-align: left;

  padding: 5px 5px 5px 5px;

  font-family: "JetBrains Mono", sans-serif;
  font-size: 14px;

  outline: none;

  border: 1px solid #e8edf1;
}
</style>