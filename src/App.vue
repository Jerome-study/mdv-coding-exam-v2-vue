<template>
  <div class="container mt-5">
    <h1>Task Management App</h1>
    <div v-if="error" class="alert alert-danger my-2" role="alert">
      {{ error }}
    </div>
    <TaskComposer class="my-3" :tasks="tasks" />
    <TaskList :tasks="tasks" @task-deleted="handleTaskDeleted" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TaskComposer from "./components/TaskComposer.vue";
import TaskList from "./components/TaskList.vue";
import axiosCustom from "./models/axios";
import { TaskProps } from "./models/types";

export default defineComponent({
  name: "App",
  data() {
    return {
      tasks: [],
      error : ''
    };
  },
  components: {
    TaskComposer,
    TaskList,
  },
  mounted() {
    this.getTask();
  },

  methods: {
    async getTask() {
      try {
        const response = await axiosCustom.get("/api/getTask");
        this.tasks = response.data;
      } catch (error: any) {
        this.error = "Something went wrong please refresh the page"
      }
    },

    async handleTaskDeleted(task_id: string) {
      this.tasks = this.tasks?.filter((task: TaskProps) => task.id !== task_id);
    },
  },
});
</script>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
